<template lang="pug">
#navbar
  b-navbar(toggleable="sm" type="dark" variant="dark" fixed="true")
    b-container
      b-navbar-brand(href="#") LOGO

      //- RWD 導航列
      b-navbar-toggle.ml-auto(target="nav-collapse")
      b-collapse#nav-collapse(is-nav)
        b-navbar-nav.ml-auto
          b-nav-item(href="#") 關於我們
          b-nav-item(href="#") 常見問題
          b-nav-item(href="#" v-b-modal="'registerAndLoginModal'" @click.prevent="isLoginModal=false") 註冊會員

      b-button.login-btn(size="sm" v-b-modal="'registerAndLoginModal'" @click="isLoginModal=true") 登入

  RegisterAndLoginModal(:isLoginForm="isLoginModal" @changeForm="changeForm")
</template>

<script>
import RegisterAndLoginModal from '../components/RegisterAndLoginModal'
export default {
  name: 'Navbar',
  components: {
    RegisterAndLoginModal
  },
  data () {
    return {
      isLoginModal: false
    }
  },
  methods: {
    changeForm (value) {
      this.isLoginModal = value
    }
  }
}
</script>
