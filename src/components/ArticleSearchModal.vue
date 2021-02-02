<template lang="pug">
  b-modal#article-search-modal(
    ref="article-search-modal"
    centered
    hide-footer
    hide-header
  )
    b-form(
      @submit.prevent="onSearch"
    )
      b-form-group
        font-awesome-icon.icon.icon--search(
          @click="onSearch"
          :icon="['fas', 'search']"
          size="lg"
          fixed-width
        )
        b-form-input(
          v-model="searchValue"
          type="text"
          placeholder="搜尋文章..."
        )
</template>

<script>
export default {
  name: 'ArticleSearchModal',
  data () {
    return {
      searchValue: ''
    }
  },
  methods: {
    onSearch () {
      if (!this.searchValue.trim()) return
      this.$router.push('/article-search/' + this.searchValue)
      this.searchValue = ''
      this.$refs['article-search-modal'].hide()
    }
  }
}
</script>
