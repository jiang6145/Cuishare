<template lang="pug">
#home
  b-container.main-container
    b-row.cuishare-article-container
      b-col(cols="12")
        .title
          //- b-avatar(:src="officialArticles[0].author.photoUrl" size="md")
          //- h4 我們的文章
        .article-item(v-for="article in officialArticles.slice(0,4)" :key="article._id")
          ArticleCard(:article="article")

    b-row.user-article-container
      b-col(cols="12" lg="8")
        .article-item(v-for="article in authorArticles" :key="article._id")
          ArticleCard(:article="article")
      b-col(lg="4")
        .side
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
      officialArticles: [],
      authorArticles: []
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
        const showFilter = result.filter(({ isPublish, isDraft, isBlocked, isUnlisted }) => {
          return isPublish && !isDraft && !isBlocked && !isUnlisted
        })

        this.officialArticles = showFilter.filter(article => article.author.username === 'Cuishare')
        this.authorArticles = showFilter.filter(article => article.author.username !== 'Cuishare')
      }
    } catch (error) {
      console.log(error.response.data.message)
    }
  }
}
</script>
