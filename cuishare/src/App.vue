<template lang="pug">
#app
  Navbar
  RegisterAndLoginModal
  router-view
</template>

<script>
// style
import '@/assets/scss/main.scss'

// component
import Navbar from './components/Navbar'
import RegisterAndLoginModal from './components/RegisterAndLoginModal'

export default {
  name: 'App',
  components: {
    Navbar,
    RegisterAndLoginModal
  }
}
</script>
