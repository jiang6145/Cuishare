<template lang="pug">
  .my-favorites
    b-container
      b-row
        b-col.mx-auto.my-favorites__col(cols="12" lg="10")
          h2.my-article__title 你收藏的文章
        b-col.mx-auto.my-favorites__col(cols="12" lg="10")
          .my-favorites__item(v-for="article in favoritesArticles" :key="article._id")
            HorizontalArticleCard(:article="article")
</template>

<script>
import HorizontalArticleCard from '../components/HorizontalArticleCard'
import dateFormat from '../dateFormat'

export default {
  name: 'MyFavorites',
  data () {
    return {
      articles: []
    }
  },
  components: {
    HorizontalArticleCard
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
      return result.filter(({ isPublish, isDraft, isBlocked, isUnlisted }) => {
        return isPublish && !isDraft && !isBlocked && !isUnlisted
      }).map((article) => {
        article.createDate = dateFormat(article.createDate, true)
        article.title = article.title ? article.title : 'Untitled'
        return article
      })
    }
  },
  async mounted () {
    try {
      const res = await this.axios.get(process.env.VUE_APP_API + '/articles')
      const { success, result } = res.data

      if (success) this.articles = this.filterPublished(result)
    } catch (error) {
      console.log(error.response.data.message)
    }
  }
}
</script>
