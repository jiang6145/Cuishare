<template lang="pug">
#home
  b-container.main-container
    b-row.cuishare-article-container
      b-col(cols="12")
        .title
          //- b-avatar(:src="cuishareArticles[0].author.photoUrl" size="md")
          //- h4 我們的文章
        .article-item(v-for="article in cuishareArticles.slice(0,4)" :key="article._id")
          ArticleCard(:article="article")

    b-row.user-article-container
      b-col(cols="12" lg="8")
        .article-item(v-for="article in articles" :key="article._id")
          ArticleCard(:article="article")
      b-col(lg="4")
        .side

  ArticlePublishModal
  b-button(v-b-modal.article-publish-modal) ArticlePublishModal
</template>

<script>
import ArticleCard from '../components/ArticleCard'
import ArticlePublishModal from '../components/ArticlePublishModal'

export default {
  name: 'Home',
  components: {
    ArticleCard,
    ArticlePublishModal
  },
  data () {
    return {
      cuishareArticles: [],
      articles: []
    }
  },
  computed: {
    user () {
      return this.$store.state.user
    }
  },
  async mounted () {
    try {
      const res = await this.axios.get(process.env.VUE_APP_API + '/articles')
      const { success, result } = res.data

      if (success) {
        this.cuishareArticles = result.filter(article => article.author.username === 'Cuishare' && article.isPublish && !article.isBlocked)
        this.articles = result.filter(article => article.author.username !== 'Cuishare' && article.isPublish && !article.isBlocked)
      }
    } catch (error) {
      alert(error.response.data.message)
    }
  }
}
</script>
