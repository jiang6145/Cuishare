<template lang="pug">
#home
  b-container
    b-row
      b-col(v-for="(article, index) in articles" :key="article._id")
        .article

</template>

<script>
export default {
  name: 'Home',
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
