<template lang="pug">
.article-card
  b-card(
    v-for="(article, index) in articles"
    :key="article._id"
    tag="article"
    no-body
  )
    b-row(no-gutters)
      b-col.left(cols="8")
        b-card-body(:title="article.title" @click="toArticle(article._id)")
          p.article-date {{ article.createDate }}
          b-card-text.article-text {{ article.text }}
        b-card-footer
          .author(@click="toUserBlog(article.author._id)")
            b-avatar(:src="article.author.photoUrl" size="sm")
            b-card-text {{ article.author.username }}
          ArticleIcons(:article="article" :size="iconSize")
      b-col.right(cols="4")
        b-card-img.cover-photo(:src="article.coverPhotoUrl" :img-alt="article.title" @click="toArticle(article)")
</template>

<script>
import ArticleIcons from './ArticleIcons'

export default {
  name: 'ArticleCard',
  components: {
    ArticleIcons
  },
  props: {
    articles: Array,
    iconSize: String
  },
  methods: {
    toArticle (articleId) {
      this.$router.push({ path: '/article/' + articleId })
    },
    toUserBlog (userId) {
      this.$router.push({ path: '/blog/' + userId })
    }
  }
}
</script>
