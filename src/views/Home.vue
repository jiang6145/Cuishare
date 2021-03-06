<template lang="pug">
  .home
    Carousel(:carouselArticles="carouselArticles")
    .official-articles
      b-container
        //- Cuishare 官方文章區塊
        b-row.official-articles__row
          b-col.mb-4(cols="12").official-articles__header
            b-avatar.official-articles__avatar.mr-3(
              button
              @click="toOfficialBlog"
              :src="officialPhotoUrl"
              size="2.4rem"
            )
            span(@click="toOfficialBlog").official-articles__name {{ officialName }}
          b-col.article-item(
            cols="12"
            md="4"
            v-for="article in officialArticles"
            :key="article._id"
          )
            VerticalArticleCard(:article="article")
          b-col(cols="12")
            p.official-articles__text(@click="toOfficialBlog") 閱讀更多我們的文章

    //- 各作者文章區塊
    .author-articles
      b-container
        b-row.author-articles__row
          b-col(cols="12" lg="8" order-lg="0" order="1")
            .article-item(v-for="article in authorArticles" :key="article._id")
              HorizontalArticleCard(:article="article")
          b-col.ml-auto(cols="12" lg="3" order-lg="1" order="0")
            .popular-tags
              ArticleTag(
                v-for="tag in getPopularTags"
                :tag="tag.name"
              )
              p.d-none.d-lg-block.popular-tags__text 文章熱門標籤，點擊標籤查詢相關文章。
</template>

<script>
import Carousel from '../components/Carousel'
import HorizontalArticleCard from '../components/HorizontalArticleCard'
import VerticalArticleCard from '../components/VerticalArticleCard'
import ArticleTag from '../components/ArticleTag'
import { dateDifference } from '../dateDifference'

export default {
  name: 'Home',
  components: {
    Carousel,
    HorizontalArticleCard,
    VerticalArticleCard,
    ArticleTag
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
    },
    officialPhotoUrl () {
      return this.officialArticles.length > 0 ? this.officialArticles[0].author.photoUrl : ''
    },
    officialName () {
      return this.officialArticles.length > 0 ? this.officialArticles[0].author.username : ''
    },
    officialId () {
      return this.officialArticles.length > 0 ? this.officialArticles[0].author._id : ''
    },
    getPopularTags () {
      const tagAll = []
      this.articles.forEach(article => {
        for (const tag of article.tags) {
          const idx = tagAll.findIndex(t => t.name === tag)
          if (idx > -1) {
            tagAll[idx].count++
          } else {
            tagAll.push({ name: tag, count: 1 })
          }
        }
      })
      tagAll.sort((a, b) => b.count - a.count)
      return tagAll.slice(0, 10)
    }
  },
  methods: {
    filterPublished (result) {
      return result.filter(article => {
        const { isPublished, isDraft, isBlocked, isUnlisted, author } = article
        return isPublished && !isDraft && !isBlocked && !isUnlisted && !author.isBlocked
      }).map((article) => {
        article.publishedDate = dateDifference(article.publishedDate)
        article.title = article.title ? article.title : 'Untitled'
        return article
      })
    },
    toOfficialBlog () {
      this.$router.push('/blog/' + this.officialId)
    }
  },
  async mounted () {
    const loader = this.$loading.show()

    try {
      const res = await this.axios.get(process.env.VUE_APP_API + '/articles')
      const { success, result } = res.data

      if (success) this.articles = this.filterPublished(result)
    } catch (error) {
      console.log(error)
    }
    loader.hide()
  }
}
</script>
