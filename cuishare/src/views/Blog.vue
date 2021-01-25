<template lang="pug">
  .blog
    b-container
      b-row
        b-col(cols="12" md="3")
          b-card(no-body).author-card
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
              FollowButton(:author="author")
        b-col.mr-auto(cols="12" md="7")
          .article-item(
            v-for="article in blogArticles"
            :key="article._id"
          )
            VerticalArticleCard(:article="article")
</template>

<script>
import VerticalArticleCard from '../components/VerticalArticleCard'
import FollowButton from '../components/FollowButton'
import dateFormat from '../dateFormat'

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
    }
  },
  methods: {
    filterPublished (result) {
      return result.filter(({ isPublish, isDraft, isBlocked, isUnlisted }) => {
        return isPublish && !isDraft && !isBlocked && !isUnlisted
      }).map((article) => {
        article.createDate = dateFormat(article.createDate, true)
        return article
      })
    }
  },
  async mounted () {
    try {
      const res = await this.axios.get(process.env.VUE_APP_API + '/articles/author/' + this.$route.params.id)
      const { success, result } = res.data

      if (success) {
        this.blogArticles = this.filterPublished(result)

        this.author = this.blogArticles[0].author
        console.log(this.author)
      }
    } catch (error) {
      alert(error.response.data.message)
    }
  }
}
</script>
