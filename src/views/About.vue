<template lang="pug">
  .about
    b-jumbotron
    b-container
      h3.about__title 關於Cuishare
      p.about__text Cuishare是一個以美食為主的寫作平台，任何人都可以在這裡自由的分享您對於飲食的知識、想法、食譜或著資訊等，凝聚對美食感興趣的人。
      p.about__text
      p.about__text 如果有任何問題，歡迎來信詢問：cuishare@gmail.com
</template>

<script>
export default {
  name: 'About'
}
</script>

<style lang="scss">
.about{
  .jumbotron{
    background: url('../plugins/images/about-banner.png') no-repeat center / cover;
  }
}
</style>
