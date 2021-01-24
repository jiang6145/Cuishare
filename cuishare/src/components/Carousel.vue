<template lang="pug">
  b-carousel.carousel(
    id="carousel"
    v-model="slide"
    controls
    indicators
    background="#939597"
  )
    b-carousel-slide.carousel__item(
      v-for="data in carouselData"
      :key="data._id"
    )
      template(#img)
        img.carousel__img(:src="data.coverPhotoUrl")
      h1.carousel__title(@click="toArticle(data._id)") {{ data.title }}
      p.carousel__text {{ data.subTitle }}

</template>
<script>
export default {
  name: 'Carousel',
  props: {
    carouselData: Array
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
