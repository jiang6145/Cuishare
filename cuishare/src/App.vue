<template lang="pug">
#app
  Navbar
  router-view
</template>

<script>
// style
import '@/assets/scss/main.scss'

// component
import Navbar from './components/Navbar'

export default {
  name: 'App',
  components: {
    Navbar
  }
}
</script>
