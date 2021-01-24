<template lang="pug">
  b-card.article-card.article-card--horizontal.overflow-hidden(no-body)
    b-row(no-gutters)
      b-col.article-card__col(cols="8")
        b-card-header.article-card__header
          b-avatar.article-card__avatar(
            size="1.6rem"
            rounded="sm"
            :to="'/blog/'+article.author._id"
          )
          span.article-card__author-name(@click="toAuthorBlog(article.author._id)") {{ article.author.username }}

        b-card-body.article-card__content(@click="toArticle(article._id)")
          h2.article-card__title {{ article.title }}
          p.article-card__sub-title {{ article.subTitle }}

        b-card-footer.article-card__footer
          span.article-card__create-at {{ article.createDate }}

      b-col.article-card__col(cols="4")
        .article-card__cover-photo(
          @click="toArticle(article._id)"
          v-if="article.coverPhotoUrl"
        )
          b-card-img.article-card__img(
            :src="article.coverPhotoUrl"
            :alt='article.title'
          )
</template>

<script>

export default {
  name: 'HorizontalArticleCard',
  components: {
  },
  props: {
    article: Object
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
