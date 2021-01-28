<template lang="pug">
  b-navbar-nav.user-menu
    b-nav-item
      b-button.custom-btn(
        v-if="isArticleEditRoute"
        variant="success"
        size="sm"
      ) 發佈文章

    b-nav-item
      b-dropdown(
        right
        no-caret
        variant="link"
      )
        template(#button-content)
          b-avatar.user-menu__avatar(:src="user.photoUrl" size="2.6rem")

        b-dropdown-item(href='#' :to="'/blog/' + user.id") 你的首頁
        b-dropdown-divider
        b-dropdown-item(href='#' to="/new-article") 寫篇文章
        b-dropdown-item(href='#' to="/user-settings") 個人設定
        b-dropdown-item(href='#' to="/my-article") 你的文章
        b-dropdown-item(href='#' to="/my-favorites") 收藏文章
        b-dropdown-item(href='#' to="/my-follow") 追蹤與粉絲
        b-dropdown-divider
        b-dropdown-item.user-menu__about(href='#') 關於Cuishare
          font-awesome-icon(
            :icon="['far', 'question-circle']"
            :size="'lg'"
            fixed-width
          )
        b-dropdown-item.dropdown--danger(@click="logout") 登出
</template>
<script>
export default {
  name: 'UserMenu',
  computed: {
    user () {
      return this.$store.state.user
    },
    isArticleEditRoute () {
      return this.$route.name === 'NewArticle' || this.$route.name === 'ArticleEdit'
    }
  },
  methods: {
    async logout () {
      try {
        await this.axios.delete(process.env.VUE_APP_API + '/users/logout')

        this.$store.commit('logout')
        if (this.$route.path !== '/') this.$router.push('/')
      } catch (error) {
        alert(error.response.data.message)
      }
    }
  }
}
</script>
