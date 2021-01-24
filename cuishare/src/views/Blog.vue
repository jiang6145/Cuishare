<template lang="pug">
#blog
  b-container.main-container
    b-row
      b-col(cols="12" lg="3")
        AuthorCard(:author="author")

      b-col.mr-auto(cols="12" lg="6")
        .article-item(v-for="article in blogArticles" :key="article._id")
          ArticleCard(:article="article" :direction="'vertical'")

</template>

<script>
import ArticleCard from '../components/ArticleCard'
import AuthorCard from '../components/AuthorCard'
import dateFormat from '../dateFormat'

export default {
  name: 'Blog',
  components: {
    ArticleCard,
    AuthorCard
  },
  data () {
    return {
      blogArticles: [],
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
    filterPublished (result) {
      return result.filter(({ isPublish, isDraft, isBlocked, isUnlisted }) => {
        return isPublish && !isDraft && !isBlocked && !isUnlisted
      }).map((article) => {
        article.createDate = dateFormat(article.createDate)
        console.log(article)
        return article
      })
    },
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
        this.blogArticles = this.filterPublished(result)

        this.author = this.blogArticles[0].author
      }
    } catch (error) {
      alert(error.response.data.message)
    }
  }
}
</script>
