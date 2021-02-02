<template lang="pug">
  b-navbar(
    :class="navbarClass"
    fixed="top"
  )
    b-container
      b-navbar-brand(href="#" to="/")
        img.logo(src="../plugins/images/logo.png")
        |Cuishare

      //- v-if="!isLogin", 未登入時的導航列
      b-navbar-nav.ml-auto(v-if="!isLogin")
        b-nav-item(
          href="#"
          v-b-modal="'user-modal'"
          @click.prevent="toggleModal(false)"
        ) 註冊會員
        b-nav-item(href="#" to="/about")
          font-awesome-icon.icon(
            :icon="['far', 'question-circle']"
            :size="'lg'"
            fixed-width
          )
        b-nav-item
          b-button(
            :class="{'custom-btn':navbarClass['light-navbar']}"
            size="sm"
            v-b-modal="'user-modal'"
            :variant="'outline-warning'"
            v-if="!isLogin"
            @click="toggleModal(true)"
          ) 登入

      //- 登入後顯示使用者頭像選單
      UserMenu(v-else)
</template>

<script>
import UserMenu from '../components/UserMenu'

export default {
  name: 'Navbar',
  components: {
    UserMenu
  },
  data () {
    return {
      navbarClass: {
        'light-navbar': false
      }
    }
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
  watch: {
    $route (to, from) {
      if (to.name === 'Home') {
        this.navbarClass['light-navbar'] = false
        return
      }

      this.navbarClass['light-navbar'] = true
    }
  },
  methods: {
    toggleModal (boolean) {
      this.$store.commit('toggleModal', boolean)
    },
    onScroll () {
      if (this.$route.name !== 'Home') return

      const carousel = document.querySelector('.carousel')
      if (window.scrollY > carousel.offsetHeight) {
        this.navbarClass['light-navbar'] = true
      } else {
        this.navbarClass['light-navbar'] = false
      }
    }
  },
  mounted () {
    window.addEventListener('scroll', this.onScroll)
  },
  beforeDestroy () {
    window.removeEventListener('scroll', this.onScroll)
  }
}
</script>
