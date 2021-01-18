<template lang="pug">
#navbar
  b-navbar(toggleable="sm" type="dark" variant="dark" fixed="true")
    b-container
      b-navbar-brand(href="#" to="/") LOGO

      //- v-if="!isLogin", 未登入時的導航列
      b-navbar-nav.ml-auto(v-if="!isLogin")
        b-nav-item(href="#" v-b-modal="'navbar-user-modal'" @click.prevent="toggleModal(false)") 註冊會員
        b-nav-item(href="#")
          font-awesome-icon(
            :icon="['far', 'question-circle']"
            :size="'lg'"
            fixed-width
          )
        b-nav-item
          b-button.login-button(
            size="sm"
            v-b-modal="'navbar-user-modal'"
            v-if="!isLogin"
            @click="toggleModal(true)"
          ) 登入

      //- 登入後顯示使用者頭像選單
      b-navbar-nav.ml-auto(v-else)
        NavbarUserMenu

  NavbarUserModal
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
  computed: {
    user () {
      return this.$store.state.user
    },
    isLogin () {
      return !!this.user.username
    },
    isLoginModal () {
      return this.$store.state.isLoginModal
    }
  },
  methods: {
    toggleModal (boolean) {
      this.$store.commit('toggleModal', boolean)
    }
  }
}
</script>
