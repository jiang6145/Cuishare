<template lang="pug">
b-sidebar(
  id="comment-sidebar"
  @shown="showComment"
  @hidden="hideComment"
  right
  shadow
)
  .comment-item(
    v-for="(comment, index) in comments"
    :key="comment._id"
  )
    .comment-user(@click="toUserBlog(comment.byUser._id)")
      b-avatar(:src="comment.byUser.photoUrl" size="sm")
      span.username {{ comment.byUser.username }}
    p.comment-text {{ comment.text }}

  b-form-textarea.commentarea
</template>

<script>
export default {
  name: 'CommentSidebar',
  data () {
    return {
      comments: []
    }
  },
  computed: {
    article () {
      return this.$store.state.activeArticle
    }
  },
  methods: {
    async showComment () {
      try {
        const res = await this.axios.get(process.env.VUE_APP_API + '/comments/' + this.article._id)
        const { success, result } = res.data
        if (success) this.comments = result
      } catch (error) {
        console.log(error)
      }
      console.log(this.comment)
    },
    hideComment () {
      this.comments = []
    },
    toUserBlog (userId) {
      this.$router.push({ path: '/blog/' + userId })
    }
  }
}
</script>
