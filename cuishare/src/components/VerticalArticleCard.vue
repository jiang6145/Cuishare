<template lang="pug">
  b-card.article-card.article-card--vertical.overflow-hidden(
    no-body
  )
    .article-card__cover-photo(
      @click="toArticle(article._id)"
      v-if="article.coverPhotoUrl"
    )
      b-card-img.article-card__img(
      :src="article.coverPhotoUrl"
      :alt='article.title'
      )
    b-card-header.article-card__header
      b-avatar.article-card__avatar(
        :src="article.author.photoUrl"
        size="1.6rem"
        rounded="sm"
      )
      span.article-card__author-name {{ article.author.username }}

    b-card-body.article-card__content
      h2.article-card__title(@click="toArticle(article._id)") {{ article.title }}
      p.article-card__sub-title {{ article.subTitle }}
      .article-card__tags
        span.tag.article-card__tag(v-for="tag in article.tags") {{ tag }}

    b-card-footer.article-card__footer
      span.article-card__create-at {{ '發布於 ' + article.publishedDate +'，'+ article.readingTime }}
      ArticleInteractive(:article="article" :size="'lg'")
</template>

<script>
import ArticleInteractive from './ArticleInteractive'
export default {
  name: 'VerticalArticleCard',
  components: {
    ArticleInteractive
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
