<template lang="pug">
  b-sidebar.comment.comment--sidebar(
    id="comment-sidebar"
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
          @input="onInput"
          @focus="onFocus"
          @blur="resetInputTextarea"
          :v-model="value"
          v-dynamic-height="{ disabled: false, minHeight: '42px' }"
          ref="textarea"
          placeholder="分享你的想法吧"
        )
        .comment__button-group
          b-button.mr-2.btn.btn--cancel(
            @click="resetInputTextarea"
            variant="light"
            size="sm"
          ) 取消
          b-button.btn.btn--submit(
            @click="submit"
            :disabled="isDisabled"
            variant="outline-warning"
            size="sm"
          ) 留言

      .comment__item(v-for="comment in comments" :key="comment._id")
        b-avatar.comment__user-avatar(:src="comment.byUser.photoUrl" size="md")
        .comment__info
          span.comment__username {{ comment.byUser.username }}
          span.comment__create-at {{ comment.createDate }}
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
    articleId: String,
    value: String
  },
  data () {
    return {
      comments: [],
      isDisabled: true,
      isShowButton: false
    }
  },
  watch: {
    value () {
      this.triggerEventToDynamicHeight()
    }
  },
  methods: {
    triggerEventToDynamicHeight () {
      this.$nextTick(() => {
        this.$refs.textarea.dispatchEvent(new Event('input'))
      })
    },
    onInput (event) {
      this.$emit('input', event.target.value)
      event.target.value.trim() ? this.isDisabled = false : this.isDisabled = true
    },
    onFocus (event) {
      this.isShowButton = true
      event.target.style['min-height'] = '84px'
    },
    resetInputTextarea (event) {
      if (event.type === 'blur' && this.$refs.textarea.value.trim()) return
      this.$refs.textarea.value = ''
      this.$refs.textarea.style['min-height'] = '42px'
      this.$refs.textarea.style.height = '42px'
      this.isDisabled = true
      this.isShowButton = false
    },
    async submit (event) {
      if (!this.$refs.textarea.value.trim()) return

      try {
        const data = { text: this.$refs.textarea.value }
        const res = await this.axios.post(process.env.VUE_APP_API + '/comments/' + this.articleId, data)
        const { success, result } = res.data

        if (success) {
          result.createDate = dateFormat(result.createDate)
          this.comments.unshift(result)
          this.resetInputTextarea(event)
        }
      } catch (error) {
        console.log(error)
      }
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
