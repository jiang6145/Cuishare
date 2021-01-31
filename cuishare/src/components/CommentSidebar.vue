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
          b-button.mr-2.custom-btn(
            @click="onCancel"
            variant="outline-secondary"
            size="sm"
          ) 取消
          b-button.custom-btn(
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
            v-if="isArticleAuthor || isCommentAuthor(comment) || user.isAdmin"
            text="Left align"
            variant="link"
            no-caret
            right
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
import dateDifference from '../dateDifference'

export default {
  name: 'CommentSidebar',
  directives: {
    DynamicHeight
  },
  props: {
    article: Object
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
    },
    isArticleAuthor () {
      return this.article.author._id === this.user.id
    }
  },
  methods: {
    isCommentAuthor (comment) {
      return comment.byUser._id === this.user.id
    },
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
        const res = await this.axios.post(process.env.VUE_APP_API + '/comments/' + this.article._id, data)
        const { success, result } = res.data

        if (success) {
          result.createDate = dateDifference(result.createDate)
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
      try {
        const res = await this.axios.delete(process.env.VUE_APP_API + '/comments/' + comment._id)
        const { success, result } = res.data
        if (success) {
          const index = this.comments.findIndex(comment => comment._id === result._id)
          this.comments.splice(index, 1)
        }
      } catch (error) {
        console.log(error)
      }
    }
  },
  async mounted () {
    try {
      const res = await this.axios.get(process.env.VUE_APP_API + '/comments/' + this.article._id)
      const { success, result } = res.data

      if (success) {
        this.comments = result.map(comment => {
          comment.createDate = dateDifference(comment.createDate)
          return comment
        })
      }
    } catch (error) {
      console.log(error)
    }
  }
}
</script>
