<template lang="pug">
  .my-favorites
    b-container
      b-row
        b-col.mx-auto.mb-4(cols="12" lg="10")
          h2.my-favorites__title 你收藏的文章
        b-col.mx-auto(cols="12" lg="10")
          .articles-item(v-for="article in favoritesArticles" :key="article._id")
            h2.articles-item__title(@click="toArticle(article)") {{ article.title }}
            .articles-item__info
              span(v-if="article.isBlocked").tag.tag--blocked.no-hover 文章已被封鎖
              b-avatar.articles-item__avatar(
                :src="article.author.photoUrl"
                size="1.4rem"
                rounded="sm"
                :to="'/blog/'+article.author._id"
              )
              span.articles-item__author-name {{ article.author.username }}
              span.articles-item__favorites-count {{ '，有 ' + article.favorites.length + ' 人收藏此文章'}}
              b-dropdown.articles-item__dropdown(
                  variant="link"
                  no-caret
                  right
                )
                  template(#button-content)
                    font-awesome-icon.icon.articles-item__icon(
                      :icon="['fas','chevron-down']"
                      fixed-width
                    )
                  b-dropdown-item.dropdown--danger(@click="unFavorites(article)") 從收藏文章中刪除
</template>

<script>
import { dateDifference } from '../dateDifference'

export default {
  name: 'MyFavorites',
  data () {
    return {
      articles: []
    }
  },
  computed: {
    user () {
      return this.$store.state.user
    },
    favoritesArticles () {
      return this.articles.filter(article => article.favorites.includes(this.user.id))
    }
  },
  methods: {
    filterPublished (result) {
      return result.filter(({ isPublished, isDraft, isBlocked, isUnlisted }) => {
        return isPublished && !isDraft && !isUnlisted
      }).map((article) => {
        article.createDate = dateDifference(article.createDate, true)
        article.title = article.title ? article.title : 'Untitled'
        return article
      })
    },
    toArticle (article) {
      if (article.isBlocked) return
      this.$router.push('/article/' + article._id)
    },
    async unFavorites (article) {
      try {
        const isUnFavorites = await this.$bvModal.msgBoxConfirm(`你確定不要繼續收藏「${article.title}」了嗎?`, {
          title: '從收藏文章中刪除',
          size: 'md',
          buttonSize: 'sm',
          okVariant: 'danger',
          okTitle: '確定',
          cancelTitle: '取消',
          hideHeaderClose: true,
          centered: true,
          headerClass: 'border-bottom-0 justify-content-center',
          bodyClass: 'text-center',
          footerClass: 'border-top-0 justify-content-center'
        })
        if (!isUnFavorites) return

        const res = await this.axios.patch(process.env.VUE_APP_API + '/articles/favorites/' + article._id)
        const { success, result } = res.data
        if (success) article.favorites = result.favorites
      } catch (error) {
        alert(error.response.data.message)
      }
    }
  },
  async mounted () {
    try {
      const res = await this.axios.get(process.env.VUE_APP_API + '/articles')
      const { success, result } = res.data

      if (success) this.articles = this.filterPublished(result)
    } catch (error) {
      console.log(error)
    }
  }
}
</script>
