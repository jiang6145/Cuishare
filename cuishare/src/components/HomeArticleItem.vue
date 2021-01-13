<template lang="pug">
.article-item
  .left
    .content-wrap
      h2.title {{article.title}}
      p.text {{ article.text }}
    .info-wrap
      .author-wrap
        b-avatar(:src="article.author.photoUrl" size="sm")
        span.author-name {{ article.author.username }}
      .icon-wrap

  .right
    img.cover-photo(:src="article.coverPhotoUrl")
</template>

<script>
export default {
  name: 'HomeArticleItem',
  props: {
    article: Object
  }
}
</script>
