<template lang="pug">
#app
  Navbar
  NavbarUserModal
  CommentSidebar
  router-view
</template>

<script>
import '@/assets/scss/main.scss'
import Navbar from './components/Navbar'
import NavbarUserModal from './components/NavbarUserModal'
import CommentSidebar from './components/CommentSidebar'

export default {
  name: 'App',
  components: {
    Navbar,
    NavbarUserModal,
    CommentSidebar
  },
  data () {
    return {
      fieldname: '密碼',
      inputname: 'password',
      type: 'password',
      rules: 'required|min:4|max:30|bannedName',
      placeholder: '用戶名稱 (可以更改)'
    }
  },
  computed: {
    user () {
      return this.$store.state.user
    }
  },
  mounted () {
    this.heartbeat()

    setInterval(() => {
      this.heartbeat()
    }, 5000)
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
  }
}
</script>
