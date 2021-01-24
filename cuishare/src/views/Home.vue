<template lang="pug">
#home
  Carousel(:carouselArticles="carouselArticles")

  b-container.main
    b-row.official-articles
      b-col(cols="12")
        HorizontalArticleCard(v-if="authorArticles[0]" :article="authorArticles[0]")
      b-col(
        cols="3"
        v-for="article in authorArticles.slice(1,5)"
        :key="article._id"
      )
        VerticalArticleCard(:article="article")

    b-row
      b-col(cols="12" md="8")
        .article-item(v-for="article in authorArticles" :key="article._id")
          HorizontalArticleCard(:article="article")

</template>

<script>
import Carousel from '../components/Carousel'
import HorizontalArticleCard from '../components/HorizontalArticleCard'
import VerticalArticleCard from '../components/VerticalArticleCard'
import dateFormat from '../dateFormat'

export default {
  name: 'Home',
  components: {
    Carousel,
    HorizontalArticleCard,
    VerticalArticleCard
  },
  data () {
    return {
      articles: []
    }
  },
  computed: {
    user () {
      return this.$store.state.user
    },
    carouselArticles () {
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
