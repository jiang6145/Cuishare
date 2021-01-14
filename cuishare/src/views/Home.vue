<template lang="pug">
#home
  b-container
    b-row
      b-col(cols="12" lg="8" v-for="(article, index) in articles" :key="article._id")
        ArticleCard(:article="article")

</template>

<script>
import ArticleCard from '../components/ArticleCard'

export default {
  name: 'Home',
  components: {
    ArticleCard
  },
  data () {
    return {
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

      if (success) this.articles = result.map(article => article)
    } catch (error) {

    }
  }
}
</script>
