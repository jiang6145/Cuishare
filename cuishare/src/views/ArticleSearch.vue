<template lang="pug">
  .article-search
    b-container
      b-row
        b-col.mx-auto(cols="12" md="8")
          h4.article-search__not-find-text(v-if="articles.length <= 0") 找不到相關文章：請查詢其它關鍵字
          .article-item(
            v-else
            v-for="article in articles"
            :key="article._id"
          )
            HorizontalArticleCard(:article="article")
</template>

<script>
import HorizontalArticleCard from '../components/HorizontalArticleCard'

export default {
  name: 'ArticleSearch',
  components: {
    HorizontalArticleCard
  },
  data () {
    return {
      articles: []
    }
  },
  watch: {
    '$route.params': {
      handler ({ value }) {
        this.getArticles(value)
      },
      immediate: true
    }
  },
  methods: {
    async getArticles (searchValue) {
      try {
        const res = await this.axios.get(process.env.VUE_APP_API + '/articles/search/' + searchValue)
        const { success, result } = res.data
        if (success) this.articles = result
      } catch (error) {
        this.articles = []
        console.log(error)
      }
    }
  },
  mounted () {
    this.getArticles(this.$route.params.value)
  }
}
</script>
