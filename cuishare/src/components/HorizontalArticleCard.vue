<template lang="pug">
  b-card.article-card.article-card--horizontal(
    tag="article"
    no-body
  )
    b-row(no-gutters)
      b-col.article-card__article-info(cols="8")
        b-card-body.article-card__body(
          :title="article.title"
          @click="toArticle(article._id)"
        )
          b-card-text.article-card__text {{ article.subTitle }}
          p.article-card__craete-at {{ articleDate }}
        b-card-footer.article-card__footer
          .article-card__author(@click="toAuthorBlog(article.author._id)")
            b-avatar.article-card__avatar(
              :src="article.author.photoUrl"
              size="sm"
            )
            b-card-text.article-card__author-name {{ article.author.username }}
          ArticleIcons(
            :article="article"
            :size="'lg'"
          )

      b-col.article-card__cover-photo(cols="4")
          b-card-img.article-card__img(:src="article.coverPhotoUrl" :img-alt="article.title" @click="toArticle(article._id)")
</template>

<script>
import ArticleIcons from './ArticleIcons'

export default {
  name: 'HorizontalArticleCard',
  components: {
    ArticleIcons
  },
  props: {
    article: Object
  },
  computed: {
    articleDate () {
      const now = new Date(this.article.createDate)
      return now
    }
  },
  methods: {
    toArticle (articleId) {
      this.$router.push('/article/' + articleId)
    },
    toAuthorBlog (authorId) {
      this.$router.push('/blog/' + authorId)
    }
  }
}
</script>
