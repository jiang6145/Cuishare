<template lang="pug">
#blog
  b-container
    b-row
      b-col(cols="12")
        ArticleCard(:articles="articles" :iconSize="'lg'")

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
