<template lang="pug">
.article-item
  .left
    .content-wrap(@click="toArticle(article)")
      h2.title {{article.title}}
      p.text {{ article.text }}

    .info-wrap
      .author-wrap
        b-avatar(:src="article.author.photoUrl" size="sm")
        span.author-name {{ article.author.username }}
      .icon-wrap
        font-awesome-icon.icon(
          :icon="likeIcon"
          :class="likeIconClass"
          @click="clikcLike(article)"
          fixed-width
        )
        font-awesome-icon.icon(
          :icon="favoritesIcon"
          :class="favoritesIconClass"
          @click="clikcFavorites(article)"
          fixed-width
        )
        font-awesome-icon.icon(
          :icon="['far', 'comment-dots']"
          fixed-width
        )

  .right
    img.cover-photo(:src="article.coverPhotoUrl")
</template>

<script>
export default {
  name: 'HomeArticleItem',
  props: {
    article: Object
  },
  computed: {
    user () {
      return this.$store.state.user
    },
    isLiked () {
      return this.article.likes.includes(this.user.id)
    },
    isfavorited () {
      return this.article.favorites.includes(this.user.id)
    },
    likeIcon () {
      if (!this.user.id) return ['far', 'heart']
      return this.isLiked ? ['fas', 'heart'] : ['far', 'heart']
    },
    favoritesIcon () {
      if (!this.user.id) return ['far', 'bookmark']
      return this.isfavorited ? ['fas', 'bookmark'] : ['far', 'bookmark']
    },
    likeIconClass () {
      return { 'checked-like-icon': this.isLiked }
    },
    favoritesIconClass () {
      return { 'checked-favorites-icon': this.isfavorited }
    }
  },
  methods: {
    async toArticle (article) {
      this.$router.push({ path: '/article', params: article._id })
    },
    async clikcLike (article) {
      if (!this.user.id) return this.$bvModal.show('navbar-user-modal')

      try {
        const res = await this.axios.patch(process.env.VUE_APP_API + '/articles/likes/' + article._id)
        const { success, result } = res.data
        if (success) article.likes = result.likes
      } catch (error) {
        alert(error.response.data.message)
      }
    },
    async clikcFavorites (article) {
      if (!this.user.id) return this.$bvModal.show('navbar-user-modal')

      try {
        const res = await this.axios.patch(process.env.VUE_APP_API + '/articles/favorites/' + article._id)
        const { success, result } = res.data
        if (success) article.favorites = result.favorites
      } catch (error) {
        alert(error.response.data.message)
      }
    }

  }
}
</script>
