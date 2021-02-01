<template lang="pug">
  .article-management
    h3.d-inline-block.mb-4.mr-3 文章管理
    span.tag.no-hover {{ '文章總數：' + articles.length}}
    b-form.mb-4
      b-form-input(
        v-model="searchValue"
        type="text"
        placeholder="搜尋文章或輸入文章狀態來查詢 ..."
      )

    .article-management__main
      b-table(
        :fields="fields"
        :items="filterArticles"
        responsive="md"
        striped
        hover
      )
        template(#cell(title)="data")
          router-link(
            :to="'/article/' + data.item._id"
            v-b-tooltip.hover.left
            :title="data.item.title"
          ) {{ data.item.title }}

        template(#cell(author)="data")
          b-avatar(
            :src="data.item.author.photoUrl"
            :to="'/blog/'+ data.item.author._id"
            size="2rem"
          )
          span.ml-2 {{ data.item.author.username }}

        template(#cell(likes)="data")
          span {{ data.item.likes }}

        template(#cell(favorites)="data")
          span {{ data.item.favorites }}

        template(#cell(isBlocked)="data")
          b-button.custom-btn.custom-btn--blockade(
            variant="outline-secondary"
            size="sm"
            @click="blockade(data)"
            :class="data.item.isBlocked ? 'btn--blocked' :''"
          ) {{ articleStatus(data) }}
</template>

<script>
export default {
  name: 'ArticleManagement',
  data () {
    return {
      searchValue: '',
      fields: [
        { key: 'title', label: '文章', sortable: true },
        { key: 'author', label: '作者', sortable: true },
        { key: 'likes', label: '喜歡', sortable: true },
        { key: 'favorites', label: '收藏', sortable: true },
        { key: 'isBlocked', label: '文章狀態' }
      ],
      articles: []
    }
  },
  computed: {
    filterArticles () {
      if (this.searchValue.startsWith('已發佈')) {
        return this.articles.filter(article => article.isPublished && !article.isUnlisted)
      } else if (this.searchValue.startsWith('未公開')) {
        return this.articles.filter(article => article.isUnlisted)
      } else if (this.searchValue.startsWith('封鎖')) {
        return this.articles.filter(article => article.isBlocked)
      } else {
        return this.articles.filter(article => article.title.indexOf(this.searchValue) >= 0)
      }
    }
  },
  methods: {
    async blockade (data) {
      try {
        const blockadeData = {
          isBlocked: !data.item.isBlocked
        }

        const res = await this.axios.patch(process.env.VUE_APP_API + '/articles/blockade/' + data.item._id, blockadeData)
        const { success, result } = res.data
        if (success) data.item.isBlocked = result.isBlocked
      } catch (error) {
        console.log(error)
      }
    },
    articleStatus (data) {
      const { isPublished, isUnlisted, isBlocked } = data.item
      return isBlocked ? '封鎖中' : (!isPublished ? '未發佈' : (isUnlisted ? '未公開' : '已發佈'))
    }
  },
  async mounted () {
    try {
      const res = await this.axios.get(process.env.VUE_APP_API + '/articles')
      const { success, result } = res.data
      if (success) {
        this.articles = result.map(article => {
          article.likes = article.likes.length
          article.favorites = article.favorites.length
          return article
        })
      }
    } catch (error) {
      console.log(error)
    }
  }
}
</script>
