<template lang="pug">
#app(
  :style="styleObject"
)
  Navbar
  UserModal
  router-view
</template>

<script>
import '@/assets/scss/main.scss'
import 'vue-img-inputer/dist/index.css'
import Navbar from './components/Navbar'
import UserModal from './components/UserModal'

export default {
  name: 'App',
  components: {
    Navbar,
    UserModal
  },
  data () {
    return {
      styleObject: {
        paddingTop: ''
      }
    }
  },
  computed: {
    user () {
      return this.$store.state.user
    }
  },
  watch: {
    $route (to, from) {
      if (to.name === 'Home') this.styleObject.paddingTop = ''
      if (to.name !== 'Home') this.styleObject.paddingTop = '80px'
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
