<template lang="pug">
  .article-tag.tag(@click="onSearch") {{ tag }}
</template>

<script>
export default {
  name: 'ArticleTag',
  props: {
    tag: String
  },
  methods: {
    onSearch () {
      this.$router.push('/article-search/' + this.tag)
    }
  }
}
</script>
