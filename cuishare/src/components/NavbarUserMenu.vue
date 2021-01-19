<template lang="pug">
b-navbar-nav#navbar-user-menu
  b-dropdown(right no-caret)
    template(#button-content)
      img.userPhoto(:src="user.photoUrl")
    b-dropdown-item(href='#') 我的首頁
    b-dropdown-divider
    b-dropdown-item(href='#' to="/new-article") 寫篇文章
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
    // async toNewArticle () {
    //   try {
    //     const res = await this.axios.post(process.env.VUE_APP_API + '/articles', {})
    //     const { success, result } = res.data
    //     console.log(success)
    //     if (success) this.$router.push({ path: '/new-article/' + result._id })
    //   } catch (error) {
    //     alert(error.response.data.message)
    //   }
    // }
  }
}
</script>
