<template lang="pug">
  b-carousel.carousel(
    id="carousel"
    v-model="slide"
    controls
    indicators
    background="#939597"
  )
    b-carousel-slide.carousel__item(
      v-for="article in carouselArticles"
      :key="article._id"
    )
      template(#img)
        img.carousel__img(:src="article.coverPhotoUrl")
      h1.carousel__title(@click="toArticle(article._id)") {{ article.title }}
      p.carousel__text {{ article.subTitle }}

</template>
<script>
export default {
  name: 'Carousel',
  props: {
    carouselArticles: Array
  },
  data () {
    return {
      slide: 0
    }
  },
  methods: {
    toArticle (articleId) {
      this.$router.push('/article/' + articleId)
    }
  }
}
</script>
