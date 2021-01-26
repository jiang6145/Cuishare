<template lang="pug">
  .my-article
    b-container
      b-row
        b-col.mx-auto.my-article__col(cols="12" lg="10")
          h2.my-article__title 你的文章
          b-button.btn(
            to="/new-article"
            variant="success"
            size="sm"
          ) 寫新文章

      b-row
        b-col.mx-auto(cols="12" lg="10")
          b-tabs
            //- 草稿
            b-tab.articles-list(title="草稿")
              .articles-list__item(
                v-for="article in draft"
                :key="article._id"
              )
                h2.articles-list__title(@click="toArticle(article._id)") {{ article.title }}
                span.articles-list__info {{ article.info }}
                b-dropdown.articles-list__dropdown(
                  size="lg"
                  variant="link"
                  no-caret
                )
                  template(#button-content)
                    font-awesome-icon.icon.articles-list__icon(
                      :icon="['fas','chevron-down']"
                      fixed-width
                    )
                  b-dropdown-item(@click="editArticle(article._id)") 編輯文章
                  b-dropdown-item(@click="deleteArticle(article)") 刪除文章

            //- 已發佈
            b-tab.articles-list(title="已發佈")
              .articles-list__item(
                v-for="article in published"
                :key="article._id"
              )
                h2.articles-list__title(@click="toArticle(article._id)") {{ article.title }}
                span.articles-list__info {{ article.info }}
                b-dropdown.articles-list__dropdown(
                  size="lg"
                  variant="link"
                  no-caret
                )
                  template(#button-content)
                    font-awesome-icon.icon.articles-list__icon(
                      :icon="['fas','chevron-down']"
                      fixed-width
                    )
                  b-dropdown-item(@click="editArticle(article._id)") 編輯文章
                  b-dropdown-item(@click="deleteArticle(article)") 刪除文章

            //- 未公開
            b-tab.articles-list(title="未公開")
              .articles-list__item(
                v-for="article in unlisted"
                :key="article._id"
              )
                h2.articles-list__title(@click="toArticle(article._id)") {{ article.title }}
                span.articles-list__info {{ article.info }}
                b-dropdown.articles-list__dropdown(
                  size="lg"
                  variant="link"
                  no-caret
                )
                  template(#button-content)
                    font-awesome-icon.icon.articles-list__icon(
                      :icon="['fas','chevron-down']"
                      fixed-width
                    )
                  b-dropdown-item(@click="editArticle(article._id)") 編輯文章
                  b-dropdown-item(@click="deleteArticle(article)") 刪除文章

</template>

<script>
import dateFormat from '../dateFormat'

export default {
  name: 'MyArticle',
  data () {
    return {
      articles: []
    }
  },
  computed: {
    user () {
      return this.$store.state.user
    },
    draft () {
      return this.articles.filter(article => {
        const { isDraft, isPublish, isUnlisted, isBlocked } = article
        return isDraft && !isPublish && !isUnlisted && !isBlocked
      })
    },
    published () {
      return this.articles.filter(article => {
        const { isDraft, isPublish, isUnlisted, isBlocked } = article
        return !isDraft && isPublish && !isUnlisted && !isBlocked
      }).map(article => {
        const likesCountText = article.likes.length > 0 ? `，有 ${article.likes.length} 人喜歡` : ''
        const favoritesCountText = article.favorites.length > 0 ? ` ，${article.favorites.length} 人收藏` : ''
        article.info = `創建於 ${article.createDate}${likesCountText}${favoritesCountText}`
        return article
      })
    },
    unlisted () {
      return this.articles.filter(article => {
        const { isDraft, isPublish, isUnlisted, isBlocked } = article
        return !isDraft && isPublish && isUnlisted && !isBlocked
      })
    }
  },
  methods: {
    toArticle (articleId) {
      this.$router.push('/article/' + articleId)
    },
    editArticle (articleId) {
      this.$router.push('/article-edit/' + articleId)
    },
    async deleteArticle (articleData) {
      try {
        const isDelete = await this.$bvModal.msgBoxConfirm(`你確定要刪除「${articleData.title}」嗎?`, {
          title: '刪除文章',
          size: 'md',
          buttonSize: 'sm',
          okVariant: 'danger',
          okTitle: '刪除',
          cancelTitle: '取消',
          hideHeaderClose: true,
          centered: true,
          headerClass: 'border-bottom-0 justify-content-center',
          bodyClass: 'text-center',
          footerClass: 'border-top-0 justify-content-center'
        })
        if (!isDelete) return

        const res = await this.axios.delete(process.env.VUE_APP_API + '/articles/' + articleData._id)
        const { success } = res.data
        if (success) {
          const index = this.articles.findIndex((article) => article._id === articleData._id)
          console.log(index)
          this.articles.splice(index, 1)
        }
      } catch (error) {
        console.log(error)
      }
    }
  },
  async mounted () {
    try {
      const res = await this.axios.get(process.env.VUE_APP_API + '/articles/author/' + this.user.id)
      const { success, result } = res.data

      if (success) {
        this.articles = result.map((article) => {
          article.createDate = dateFormat(article.createDate, true)
          article.title = article.title ? article.title : 'Untitled'
          return article
        })
      }
    } catch (error) {
      console.log(error)
    }
  }

}
</script>
