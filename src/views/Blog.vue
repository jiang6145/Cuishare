<template lang="pug">
  .blog
    b-container
      b-row
        p.no-articles-text(v-if="blogArticles.length <= 0 ") 目前還沒有文章，趕快分享你的想法
        b-col(cols="12" lg="3")
          b-card(no-body).author-card(v-if="blogArticles.length > 0 ")
            b-card-header.author-card__header
              b-avatar.author-card__avatar(
                :src="author.photoUrl"
                size="7rem"
                rounded="sm"
              )
            b-card-body.author-card__body
              p.author-card__username {{ author.username }}
              p.author-card__about {{ author.about }}
            b-card-footer.author-card__footer
              FollowButton(
                v-if="!isBlogAuthor"
                :author="author"
              )
        b-col.mr-auto(cols="12" lg="7")
          .article-item(
            v-for="article in blogArticles"
            :key="article._id"
          )
            VerticalArticleCard(:article="article")
</template>

<script>
import VerticalArticleCard from '../components/VerticalArticleCard'
import FollowButton from '../components/FollowButton'
import { dateDifference } from '../dateDifference'

export default {
  name: 'Blog',
  components: {
    VerticalArticleCard,
    FollowButton
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
    },
    isBlogAuthor () {
      return this.user.id === this.author._id
    }
  },
  methods: {
    filterPublished (result) {
      return result.filter(({ isPublished, isDraft, isBlocked, isUnlisted }) => {
        return isPublished && !isDraft && !isBlocked && !isUnlisted
      }).map((article) => {
        article.publishedDate = dateDifference(article.publishedDate)
        return article
      })
    }
  },
  async mounted () {
    const loader = this.$loading.show()
    try {
      const res = await this.axios.get(process.env.VUE_APP_API + '/articles/author/' + this.$route.params.id)
      const { success, result } = res.data

      if (result.length > 0 && success) {
        if (result[0].author.isBlocked) {
          this.$router.go(-1)
          this.$toasted.error('此作者已被封鎖，不可訪問')
        }

        this.blogArticles = this.filterPublished(result)
        this.author = result[0].author
      }
    } catch (error) {
      console.log(error)
    }

    loader.hide()
  }
}
</script>
