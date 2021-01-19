<template lang="pug">
#article-edit
  p {{ id }}

</template>

<script>
export default {
  name: 'ArticleEdit',
  data () {
    return {
      id: this.$route.params.id
    }
  }
}
</script>
