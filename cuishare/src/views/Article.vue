<template lang="pug">
#article
  h1 文章頁面
</template>

<script>
export default {
  name: 'Article',
  mounted () {
    console.log(this.$route)
  }
}
</script>
