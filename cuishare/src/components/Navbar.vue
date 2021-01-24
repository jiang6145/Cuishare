<template lang="pug">
  b-navbar(fixed="top")
    b-container
      b-navbar-brand(href="#" to="/") LOGO

      //- v-if="!isLogin", 未登入時的導航列
      b-navbar-nav.ml-auto(v-if="!isLogin")
        b-nav-item.navbar__item(
          href="#"
          v-b-modal="'user-modal'"
          @click.prevent="toggleModal(false)"
        ) 註冊會員
        b-nav-item.navbar__item(href="#")
          font-awesome-icon(
            :icon="['far', 'question-circle']"
            :size="'lg'"
            fixed-width
          )
        b-nav-item.navbar__item
          b-button.btn.btn--login(
            size="sm"
            v-b-modal="'user-modal'"
            variant="outline-dark"
            v-if="!isLogin"
            @click="toggleModal(true)"
          ) 登入

      //- 登入後顯示使用者頭像選單
      b-navbar-nav.ml-auto(v-else)
        NavbarUserMenu
</template>

<script>
import NavbarUserMenu from '../components/NavbarUserMenu'

export default {
  name: 'Navbar',
  components: {
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
