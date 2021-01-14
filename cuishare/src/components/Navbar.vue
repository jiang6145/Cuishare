<template lang="pug">
#navbar
  b-navbar(toggleable="sm" type="dark" variant="dark" fixed="true")
    b-container
      b-navbar-brand(href="#" to="/") LOGO

      //- v-if="!isLogin", 未登入時的導航列
      b-navbar-toggle.ml-auto(target="nav-collapse" v-if="!isLogin")
      b-collapse#nav-collapse(is-nav v-if="!isLogin")
        b-navbar-nav.ml-auto
          b-nav-item(href="#") 關於我們
          b-nav-item(href="#") 常見問題
          b-nav-item(href="#" v-b-modal="'navbar-user-modal'" @click.prevent="isLoginModal=false") 註冊會員

      b-button.login-button(
        size="sm"
        v-b-modal="'navbar-user-modal'"
        v-if="!isLogin"
        @click="isLoginModal=true"
      ) 登入

      //- 登入後顯示使用者頭像選單
      NavbarUserMenu(v-else)

  NavbarUserModal(:isLoginForm="isLoginModal" @changeForm="changeForm")
</template>

<script>
import NavbarUserModal from '../components/NavbarUserModal'
import NavbarUserMenu from '../components/NavbarUserMenu'
export default {
  name: 'Navbar',
  components: {
    NavbarUserModal,
    NavbarUserMenu
  },
  data () {
    return {
      isLoginModal: false
    }
  },
  computed: {
    user () {
      return this.$store.state.user
    },
    isLogin () {
      return !!this.user.username
    }
  },
  methods: {
    changeForm (value) {
      this.isLoginModal = value
    }
  }
}
</script>
