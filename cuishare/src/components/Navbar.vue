<template lang="pug">
#navbar
  b-navbar(toggleable="sm" type="dark" variant="dark" fixed="true")
    b-container
      b-navbar-brand(href="#") LOGO

      //- v-if="!isLogin", 未登入時的導航列
      b-navbar-toggle.ml-auto(target="nav-collapse" v-if="!isLogin")
      b-collapse#nav-collapse(is-nav v-if="!isLogin")
        b-navbar-nav.ml-auto
          b-nav-item(href="#") 關於我們
          b-nav-item(href="#") 常見問題
          b-nav-item(href="#" v-b-modal="'register-and-login-modal'" @click.prevent="isLoginModal=false") 註冊會員

      b-button.login-btn(
        size="sm"
        v-b-modal="'register-and-login-modal'"
        v-if="!isLogin"
        @click="isLoginModal=true"
      ) 登入

      //- 登入後顯示使用頭像
      b-dropdown.user-button(v-if="isLogin" right no-caret)
        template(#button-content)
          img.userPhoto(:src="user.photoUrl")
        b-dropdown-item(href='#') 我的首頁
        b-dropdown-divider
        b-dropdown-item(href='#') 寫篇文章
        b-dropdown-item(href='#') 設定
        b-dropdown-divider
        b-dropdown-item(href='#') 關於Cuishare
        b-dropdown-item(href='#') 登出

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
  computed: {
    user () {
      return this.$store.state.user
    },
    isLogin () {
      return this.user.id
    }
  },
  methods: {
    changeForm (value) {
      this.isLoginModal = value
    }
  }
}
</script>
