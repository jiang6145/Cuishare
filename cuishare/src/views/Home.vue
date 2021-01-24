<template lang="pug">
#home
  Carousel(:carouselData="carouselData")

  b-container
    b-row
      b-col

    b-row
      b-col(cols="12" lg="8")
        .article-item(v-for="article in authorArticles" :key="article._id")
          ArticleCard(:article="article")
      b-col(lg="4")
        .side
</template>

<script>
import ArticleCard from '../components/ArticleCard'
import ArticlePublishModal from '../components/ArticlePublishModal'
import Carousel from '../components/Carousel'
import dateFormat from '../dateFormat'

export default {
  name: 'Home',
  components: {
    ArticleCard,
    ArticlePublishModal,
    Carousel
  },
  data () {
    return {
      articles: [],
      slide: 0
    }
  },
  computed: {
    user () {
      return this.$store.state.user
    },
    carouselData () {
      return this.articles.concat().sort((a, b) => {
        const likesCountA = a.likes.length
        const likesCountB = b.likes.length
        return likesCountB - likesCountA
      }).slice(0, 5)
    },
    officialArticles () {
      return this.articles.filter(article => article.author.username === 'Cuishare').slice(0, 6)
    },
    authorArticles () {
      return this.articles.filter(article => article.author.username !== 'Cuishare')
    }
  },
  methods: {
    filterPublished (result) {
      return result.filter(({ isPublish, isDraft, isBlocked, isUnlisted }) => {
        return isPublish && !isDraft && !isBlocked && !isUnlisted
      }).map((article) => {
        article.createDate = dateFormat(article.createDate)
        console.log(article)
        return article
      })
    }
  },
  async mounted () {
    try {
      const res = await this.axios.get(process.env.VUE_APP_API + '/articles')
      const { success, result } = res.data

      if (success) {
        this.articles = this.filterPublished(result)
      }
    } catch (error) {
      console.log(error.response.data.message)
    }
  }
}
</script>
