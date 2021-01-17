<template lang="pug">
  b-card.article-card(no-body tag="article")
    b-row(no-gutters)
      b-col.left(cols="8")
        b-card-body(:title="article.title" @click="toArticle(article)")
          p.article-date {{ article.createDate }}
          b-card-text.article-text {{ article.text }}
        b-card-footer
          .author
            b-avatar(:src="article.author.photoUrl" size="sm")
            b-card-text {{ article.author.username }}
          ArticleIcon(:article="article")
      b-col.right(cols="4")
        b-card-img.cover-photo(:src="article.coverPhotoUrl" :img-alt="article.title" @click="toArticle(article)")
</template>

<script>
import ArticleIcon from './ArticleIcon'

export default {
  name: 'ArticleCard',
  components: {
    ArticleIcon
  },
  props: {
    article: Object
  },
  methods: {
    toArticle (article) {
      this.$router.push({ path: '/article/' + article._id })
    }
  }
}
</script>
