<template lang="pug">
b-navbar-nav.user-menu
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
    b-dropdown-item(href='#' to="/my-favorites") 你收藏的文章
    b-dropdown-divider
    b-dropdown-item.user-menu__about(href='#') 關於Cuishare
      font-awesome-icon(
        :icon="['far', 'question-circle']"
        :size="'lg'"
        fixed-width
      )
    b-dropdown-item.user-menu__logout(@click="logout") 登出
</template>
<script>
export default {
  name: 'UserMenu',
  computed: {
    user () {
      return this.$store.state.user
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
