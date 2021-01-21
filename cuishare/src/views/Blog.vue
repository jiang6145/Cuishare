<template lang="pug">
#blog
  b-container.main-container
    b-row
      b-col(cols="12" lg="3")
        AuthorCard(:author="author")

      b-col.mr-auto(cols="12" lg="6")
        .article-item(v-for="(article, index) in articles" :key="article._id")
          ArticleCard(:article="article" :direction="'vertical'")

</template>

<script>
import ArticleCard from '../components/ArticleCard'
import AuthorCard from '../components/AuthorCard'

export default {
  name: 'Blog',
  components: {
    ArticleCard,
    AuthorCard
  },
  data () {
    return {
      articles: [],
      author: {}
    }
  },
  computed: {
    user () {
      return this.$store.state.user
    },
    isFollow () {
      return this.user.following.includes(this.author._id)
    }
  },
  methods: {
    async follow () {
      try {
        const res = await this.axios.patch(process.env.VUE_APP_API + '/users/follow/' + this.author._id)
        const { success, message, result } = res.data
        console.log(success, message, result)

        if (success) this.$store.commit('following', result)
      } catch (error) {
        alert(error)
      }
    }
  },
  async mounted () {
    try {
      const res = await this.axios.get(process.env.VUE_APP_API + '/articles/author/' + this.$route.params.id)
      const { success, result } = res.data

      if (success) {
        this.articles = result.map(article => article)
        this.author = this.articles[0].author
      }
    } catch (error) {
      alert(error.response.data.message)
    }
  }
}
</script>
