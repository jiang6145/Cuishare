<template lang="pug">
#app
  Navbar
  LoginModal
  router-view
</template>

<script>
// style
import '@/assets/scss/main.scss'

// component
import Navbar from './components/Navbar'
import LoginModal from './components/LoginModal'

export default {
  name: 'App',
  components: {
    Navbar,
    LoginModal
  }
}
</script>
