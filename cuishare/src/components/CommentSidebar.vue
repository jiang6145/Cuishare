<template lang="pug">
  b-sidebar.comment.comment--sidebar(
    id="comment-sidebar"
    ref="commentSidebar"
    @change="onChange"
    no-close-on-route-change
    backdrop
    right
    shadow
    no-header
  )
    template(#default="{ hide, show }")
      .comment__header
        b-button-close.btn.btn--close(@click="hide")
        h4.comment__title 留言
        textarea.comment__input-textarea(
          @focus="onFocus"
          @blur="onBlur"
          v-model="commentText"
          v-dynamic-height="{ minHeight: '42px' }"
          ref="textarea"
          placeholder="分享你的想法吧"
        )
        .comment__button-group(v-if="isShowButton")
          b-button.mr-2.btn.btn--cancel(
            @click="onCancel"
            variant="light"
            size="sm"
          ) 取消
          b-button.btn.btn--submit(
            @click="onSubmit"
            :disabled="isDisabled"
            variant="outline-warning"
            size="sm"
          ) 留言

      .comment__item(v-for="comment in comments" :key="comment._id")
        b-avatar.comment__user-avatar(
          :to="'/blog/' + comment.byUser._id"
          :src="comment.byUser.photoUrl"
          size="md"
        )
        .comment__info
          span.comment__username {{ comment.byUser.username }}
          span.comment__create-at {{ comment.createDate }}
          b-dropdown(
            text="Left align"
            variant="link"
            no-caret
          )
            template(#button-content)
              font-awesome-icon.icon(
                :icon="['fas','ellipsis-v']"
                fixed-width
              )
            b-dropdown-item.dropdown--danger(@click="deleteComment(comment)") 刪除留言
        p.comment__content {{ comment.text }}

</template>

<script>
import DynamicHeight from 'vue-dynamic-height'
import dateFormat from '../dateFormat'

export default {
  name: 'CommentSidebar',
  directives: {
    DynamicHeight
  },
  props: {
    articleId: String
  },
  data () {
    return {
      commentText: '',
      comments: [],
      isDisabled: true,
      isShowButton: false
    }
  },
  watch: {
    commentText () {
      if (this.commentText.trim()) {
        this.isDisabled = false
      } else {
        this.isDisabled = true
      }
    }
  },
  computed: {
    user () {
      return this.$store.state.user
    }
  },
  methods: {
    onFocus (event) {
      event.target.style['min-height'] = '84px'
      this.isShowButton = true
    },
    onBlur () {
      if (this.commentText.trim()) return
      this.resetTextarea()
    },
    onCancel () {
      this.resetTextarea()
    },
    async onSubmit () {
      if (!this.commentText.trim()) return

      try {
        const data = { text: this.commentText }
        const res = await this.axios.post(process.env.VUE_APP_API + '/comments/' + this.articleId, data)
        const { success, result } = res.data

        if (success) {
          result.createDate = dateFormat(result.createDate, false)
          this.comments.unshift(result)
          this.resetTextarea()
        }
      } catch (error) {
        console.log(error)
      }
    },
    onChange () {
      if (this.user.id) return
      this.$refs.commentSidebar.hide()
      this.$bvModal.show('user-modal')
    },
    resetTextarea () {
      this.commentText = ''
      this.isShowButton = false
      this.$refs.textarea.style['min-height'] = '42px'
      this.$refs.textarea.style.height = '42px'
    },
    async deleteComment (comment) {
      console.log(comment)
      const res = this.axios.delete(process.ev.VUE_APP_API + '/comments/' + comment._id)
      console.log(res)
    }
  },
  async mounted () {
    try {
      const res = await this.axios.get(process.env.VUE_APP_API + '/comments/' + this.articleId)
      const { success, result } = res.data

      if (success) {
        this.comments = result.map(comment => {
          comment.createDate = dateFormat(comment.createDate)
          return comment
        })
      }
    } catch (error) {
      console.log(error)
    }
  }
}
</script>
