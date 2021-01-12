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
  },
  computed: {
    user () {
      return this.$store.state.user
    }
  },
  methods: {
    async heartbeat () {
      try {
        const res = await this.axios.get(process.env.VUE_APP_API + '/users/heartbeat')

        if (this.user.id && !res.data.success) {
          alert('發生錯誤')
          this.$store.commit('logout')
          if (this.$route.path !== '/') this.$router.push('/')
        }
      } catch (error) {
        alert(error.response.data.message)
        this.$store.commit('logout')
        if (this.$route.path !== '/') this.$router.push('/')
      }
    }
  },
  mounted () {
    this.heartbeat()

    setInterval(() => {
      this.heartbeat()
    }, 5000)
  }
}
</script>
