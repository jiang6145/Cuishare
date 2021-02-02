<template lang="pug">
  .article-search
    b-container
      b-row
        b-col.mx-auto(cols="12" md="8")
          h4.article-search__text {{ searchText }}
          .article-item(
            v-for="article in articles"
            :key="article._id"
          )
            HorizontalArticleCard(:article="article")
</template>

<script>
import HorizontalArticleCard from '../components/HorizontalArticleCard'
import { dateDifference } from '../dateDifference'

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
  computed: {
    searchText () {
      return this.articles.length === 0
        ? '找不到相關文章：請查詢其它關鍵字'
        : '關鍵字：「' + this.$route.params.value + '」的相關文章'
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
      const loader = this.$loading.show()
      try {
        const res = await this.axios.get(process.env.VUE_APP_API + '/articles/search/' + searchValue)
        const { success, result } = res.data
        // if (success) this.articles = result
        if (success) {
          this.articles = result.map((article) => {
            article.publishedDate = dateDifference(article.publishedDate)
            return article
          })
        }
      } catch (error) {
        this.articles = []
        console.log(error)
      }
      loader.hide()
    }
  },
  mounted () {
    this.getArticles(this.$route.params.value)
  }
}
</script>
