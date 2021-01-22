<template lang="pug">
.comment-sidebar
  b-sidebar(
    id="comment-sidebar"
    backdrop
    right
    shadow
  )
    //- b-container
    //-   b-row
    //-     b-col(cols="12")
    .comment-item(v-for="comment in comments" :key="comment._id")
      .comment-item__avatar
        b-avatar(:src="comment.byUser.photoUrl" size="md")
        .comment-item__info
          span.comment-item__info__username {{ comment.byUser.username }}
          span.comment-item__info__create-at {{ comment.createDate }}
      .comment-item__content
        p {{ comment.text }}

    template(#header)
      textarea.comment-textarea(
        v-dynamic-height="{ disabled: false,minHeight: '20px' }"
        ref="textarea"
        placeholder="分享你的閱讀感想吧"
        :value="value"
        @input="onInput"
      )
</template>

<script>
import DynamicHeight from 'vue-dynamic-height'

export default {
  name: 'CommentSidebar',
  directives: {
    DynamicHeight
  },
  props: {
    articleId: String,
    value: String
  },
  watch: {
    value () {
      this.triggerEventToDynamicHeight()
    }
  },
  data () {
    return {
      comments: []
    }
  },
  methods: {
    triggerEventToDynamicHeight () {
      this.$nextTick(() => {
        this.$refs.textarea.dispatchEvent(new Event('input'))
      })
    },
    onInput () {
      this.$emit('input', event.target.value)
    }
  },
  async mounted () {
    try {
      const res = await this.axios.get(process.env.VUE_APP_API + '/comments/' + this.articleId)
      const { success, result } = res.data
      if (success) this.comments = result
      console.log(this.comments)
    } catch (error) {
      console.log(error)
    }
  }
}
</script>
