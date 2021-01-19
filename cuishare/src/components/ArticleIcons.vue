<template lang="pug">
.article-icons
  .icon(
    v-b-tooltip.hover.bottomleft
    :title="likeCount"
  )
    font-awesome-icon(
      :icon="likeIcon"
      :size="size"
      :class="likeIconClass"
      @click="clikcLike(article)"
      fixed-width
    )
  .icon(
    v-b-tooltip.hover.bottomleft
    :title="favoritesCount"
  )
    font-awesome-icon(
      :icon="favoritesIcon"
      :size="size"
      :class="favoritesIconClass"
      @click="clikcFavorites(article)"
      fixed-width
    )
  .icon(
    v-b-tooltip.hover.bottomleft
    v-b-toggle.comment-sidebar
    title="留言"
  )
    font-awesome-icon(
      :icon="['far', 'comment-dots']"
      :size="size"
      fixed-width
    )
</template>

<script>
export default {
  name: 'ArticleIcons',
  props: {
    article: Object,
    size: String
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
      const tooltipText = length ? `${length} 人喜歡` : '喜歡文章嗎?'
      return tooltipText
    },
    favoritesCount () {
      const length = this.article.favorites.length
      const tooltipText = length ? `${length} 人收藏` : '收藏文章'
      return tooltipText
    }
  },
  methods: {
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
