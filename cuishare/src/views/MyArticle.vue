<template lang="pug">
  .my-article
    b-container
      b-row
        b-col.mx-auto.mb-4.my-article__col(cols="12" lg="10")
          h2.my-article__title 你的文章
          b-button.custom-btn(
            @click="createArticle"
            variant="success"
            size="sm"
          ) 寫文章

      b-row
        b-col.mx-auto(cols="12" lg="10")
          b-tabs
            //- 草稿
            b-tab.articles-list(:title="'草稿 '+ draft.length")
              .articles-list__item(
                v-for="article in draft"
                :key="article._id"
              )
                h2.articles-list__title(@click="toArticle(article)") {{ article.title }}
                span(v-if="article.isBlocked").tag.tag--blocked.no-hover 文章已被封鎖
                span.articles-list__info {{ '創建於 ' + article.createDate }}
                b-dropdown.articles-list__dropdown(
                  variant="link"
                  no-caret
                  right
                )
                  template(#button-content)
                    font-awesome-icon.icon.articles-list__icon(
                      :icon="['fas','chevron-down']"
                      fixed-width
                    )
                  b-dropdown-item(@click="editArticle(article)") 編輯文章
                  b-dropdown-item.dropdown--danger(@click="deleteArticle(article)") 刪除文章

            //- 已發佈
            b-tab.articles-list(:title="'已發佈 ' + published.length")
              .articles-list__item(
                v-for="article in published"
                :key="article._id"
              )
                h2.articles-list__title(@click="toArticle(article)") {{ article.title }}
                span(v-if="article.isBlocked").tag.tag--blocked.no-hover 文章已被封鎖
                span.articles-list__info {{ article.info }}
                b-dropdown.articles-list__dropdown(
                  variant="link"
                  no-caret
                  right
                )
                  template(#button-content)
                    font-awesome-icon.icon.articles-list__icon(
                      :icon="['fas','chevron-down']"
                      fixed-width
                    )
                  b-dropdown-item(@click="editArticle(article)") 編輯文章
                  b-dropdown-item.dropdown--danger(@click="deleteArticle(article)") 刪除文章

            //- 未公開
            b-tab.articles-list(:title="'未公開 ' + unlisted.length")
              .articles-list__item(
                v-for="article in unlisted"
                :key="article._id"
              )
                h2.articles-list__title(@click="toArticle(article)") {{ article.title }}
                span(v-if="article.isBlocked").tag.tag--blocked.no-hover 文章已被封鎖
                span.articles-list__info {{ '創建於 ' + article.createDate }}
                b-dropdown.articles-list__dropdown(
                  variant="link"
                  no-caret
                  right
                )
                  template(#button-content)
                    font-awesome-icon.icon.articles-list__icon(
                      :icon="['fas','chevron-down']"
                      fixed-width
                    )
                  b-dropdown-item(@click="editArticle(article)") 編輯文章
                  b-dropdown-item.dropdown--danger(@click="deleteArticle(article)") 刪除文章

</template>

<script>
import { dateDifference } from '../dateDifference'

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
        const { isDraft, isPublished, isUnlisted } = article
        return isDraft && !isPublished && !isUnlisted
      })
    },
    published () {
      return this.articles.filter(article => {
        const { isDraft, isPublished, isUnlisted } = article
        return !isDraft && isPublished && !isUnlisted
      }).map(article => {
        const likesCountText = article.likes.length > 0 ? `，有 ${article.likes.length} 人喜歡` : ''
        const favoritesCountText = article.favorites.length > 0 ? ` ，有 ${article.favorites.length} 人收藏` : ''
        article.info = `發布於 ${article.publishedDate}${likesCountText}${favoritesCountText}`
        return article
      })
    },
    unlisted () {
      return this.articles.filter(article => {
        const { isDraft, isPublished, isUnlisted } = article
        return !isDraft && isPublished && isUnlisted
      })
    }
  },
  methods: {
    async createArticle () {
      try {
        const res = await this.axios.post(process.env.VUE_APP_API + '/articles', {})
        const { success, result } = res.data
        if (success) this.$router.push('/article-edit/' + result._id)
      } catch (error) {
        console.log(error)
      }
    },
    toArticle (article) {
      if (article.isBlocked) return
      this.$router.push('/article/' + article._id)
    },
    editArticle (article) {
      if (article.isBlocked) return
      this.$router.push('/article-edit/' + article._id)
    },
    async deleteArticle (article) {
      try {
        const isDelete = await this.$bvModal.msgBoxConfirm(`你確定要刪除「${article.title}」嗎?`, {
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

        const res = await this.axios.delete(process.env.VUE_APP_API + '/articles/' + article._id)
        const { success, result } = res.data
        if (success) {
          const index = this.articles.findIndex(article => article._id === result._id)
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
          article.createDate = dateDifference(article.createDate)
          article.publishedDate = dateDifference(article.publishedDate)
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
