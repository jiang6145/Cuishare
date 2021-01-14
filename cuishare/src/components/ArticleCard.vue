<template lang="pug">
  b-card.article-card(no-body tag="article")
    b-row(no-gutters)
      b-col.left(cols="8")
        b-card-body(:title="article.title" @click="toArticle(article)")
          p.article-date {{ article.createDate }}
          b-card-text.article-text {{ article.text }}
        b-card-footer
          .author
            b-avatar(:src="article.author.photoUrl" size="sm")
            b-card-text {{ article.author.username }}
          .icon-group
            .icon(v-b-tooltip.hover.bottomleft :title="likeCount")
              font-awesome-icon(
                :icon="likeIcon"
                :class="likeIconClass"
                @click="clikcLike(article)"
                fixed-width
              )
            .icon(v-b-tooltip.hover.bottomleft :title="favoritesCount")
              font-awesome-icon(
                :icon="favoritesIcon"
                :class="favoritesIconClass"
                @click="clikcFavorites(article)"
                fixed-width
              )
            .icon(v-b-tooltip.hover.bottomleft title="留言")
              font-awesome-icon(
                :icon="['far', 'comment-dots']"
                fixed-width
              )

      b-col.right(cols="4")
        b-card-img.cover-photo(:src="article.coverPhotoUrl" :img-alt="article.title" @click="toArticle(article)")
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
    },
    likeCount () {
      const length = this.article.likes.length
      const content = length ? `${length} 人喜歡` : '喜歡文章嗎?'
      return content
    },
    favoritesCount () {
      const length = this.article.favorites.length
      const content = length ? `${length} 人收藏` : '收藏文章'
      return content
    }
  },
  methods: {
    toArticle (article) {
      this.$router.push({ path: '/article/' + article._id })
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
