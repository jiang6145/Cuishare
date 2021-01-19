<template lang="pug">
#home
  b-container.main-container
    //- b-row.cuishare-article-container
    //-   b-col(cols="12" lg="7")
    //-     ArticleCard(:article="article" :direction="'vertical'")
    //-   b-col(cols="12" lg="5")
    //-     .article-item(v-for="(article, index) in articles" :key="article._id")
    //-       ArticleCard(:article="article")

    b-row.user-article-container
      b-col(cols="12" lg="8")
        .article-item(v-for="(article, index) in articles" :key="article._id")
          ArticleCard(:article="article")
      b-col(lg="4")
        .side

  CommentSidebar(:articles="articles")
</template>

<script>
import ArticleCard from '../components/ArticleCard'
import CommentSidebar from '../components/CommentSidebar'

export default {
  name: 'Home',
  components: {
    ArticleCard,
    CommentSidebar
  },
  data () {
    return {
      articles: [],
      cuishareArticles: []
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
        this.articles = result.filter(article => article)
      }
    } catch (error) {
      alert(error.response.data.message)
    }
  }
}
</script>

<style lang="scss">
.side{
  background-color: red;
  height: 100px;
  position: sticky;
  top: 1rem;
  left: 0;
}
</style>
