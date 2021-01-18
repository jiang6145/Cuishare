<template lang="pug">
  b-card.article-card(tag="article" no-body :class="classCard")
    b-row(no-gutters)
      b-col.left(cols="8")
        b-card-body(:title="article.title" @click="toArticle(article._id)")
          p.article-date {{ article.createDate }}
          b-card-text.article-text {{ article.text }}
        b-card-footer
          .author(@click="toUserBlog(article.author._id)")
            b-avatar(:src="article.author.photoUrl" size="sm")
            b-card-text {{ article.author.username }}
          ArticleIcons(:article="article" :size="'lg'")
      b-col.right(cols="4")
        b-card-img.cover-photo(:src="article.coverPhotoUrl" :img-alt="article.title" @click="toArticle(article._id)")
</template>

<script>
import ArticleIcons from './ArticleIcons'

export default {
  name: 'ArticleCard',
  components: {
    ArticleIcons
  },
  props: {
    article: Object,
    direction: {
      type: String,
      default: 'horizontal',
      validator: function (value) {
        return [
          'vertical',
          'horizontal'
        ].indexOf(value) !== -1
      }
    }
  },
  computed: {
    classCard () {
      return 'card-' + this.direction
    }
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
