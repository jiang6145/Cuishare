<template lang="pug">
#blog
  b-container.main-container
    b-row
      b-col.mx-auto(cols="12" lg="7")
        .article-item(v-for="(article, index) in articles" :key="article._id")
          ArticleCard(:article="article" :direction="'vertical'")

</template>

<script>
import ArticleCard from '../components/ArticleCard'

export default {
  name: 'Blog',
  components: {
    ArticleCard
  },
  data () {
    return {
      articles: []
    }
  },
  async mounted () {
    try {
      console.log(this.$route.params.id)
      const res = await this.axios.get(process.env.VUE_APP_API + '/articles/author/' + this.$route.params.id)
      const { success, result } = res.data

      if (success) this.articles = result.map(article => article)
    } catch (error) {
      alert(error.response.data.message)
    }
  }
}
</script>
