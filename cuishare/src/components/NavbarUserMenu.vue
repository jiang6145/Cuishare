<template lang="pug">
#navbar-user-menu
  b-dropdown(right no-caret)
    template(#button-content)
      img.userPhoto(:src="user.photoUrl")
    b-dropdown-item(href='#') 我的首頁
    b-dropdown-divider
    b-dropdown-item(href='#') 寫篇文章
    b-dropdown-item(href='#') 設定
    b-dropdown-divider
    b-dropdown-item(href='#') 關於Cuishare
    b-dropdown-item(@click="logout") 登出
</template>
<script>
export default {
  name: 'NavbarUserMenu',
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
