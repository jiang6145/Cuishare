<template lang="pug">
#navbar
  b-navbar(toggleable='lg' type='dark' variant='info')
    .container
      b-navbar-brand(href='#') LOGO
      b-navbar-toggle(target='nav-collapse')
      b-collapse#nav-collapse(is-nav)
        b-navbar-nav
          b-nav-item(href='#') 關於我們
        b-navbar-nav.ml-auto
          b-button.my-2.my-sm-0(v-b-modal.modal-login size='md') Login

  b-modal#modal-login(size='lg' centered hide-footer)
    .photo

    b-form#login-form(@submit="onSubmit")
      h3.title.text-center 歡迎使用 Cuishare
      b-form-group#input-group-username(
        v-if="!isLoginPage"
        label-for='input-username'
        :state='usernameState'
        invalid-feedback='暱稱為 4 ~ 30 個字'
      )
        b-form-input#input-username(
          v-model='username'
          type='text'
          required
          placeholder='請輸入暱稱'
          :state='usernameState'
        )
      b-form-group#input-group-email(
        label-for='input-email'
        :state='emailState'
        invalid-feedback='email 格式錯誤'
      )
        b-form-input#input-email(
          v-model='email'
          type='text'
          required
          placeholder='請輸入 email'
          :state='emailState'
        )
      b-form-group#input-group-password(
        label-for='input-password'
        :state='passwordState'
        invalid-feedback='密碼僅包含數字、英文、最少需要6個字'
      )
        b-form-input#input-password(
          v-model='password'
          type='password'
          required
          placeholder='請輸入密碼'
          :state='passwordState'
        )
      b-form-group#input-group-password2(
        v-if="!isLoginPage"
        label-for='input-password2'
        :state='password2State'
        invalid-feedback='請確認密碼是否正確'
      )
        b-form-input#input-password2(
          v-model='password2'
          type='password'
          required
          placeholder='請再次輸入密碼'
          :state='password2State'
        )

      .resMessage.text-center
        p {{ resMessage }}

      .btn-wrap.text-center
        b-btn.mx-1.w-100(
          v-if="isLoginPage"
          variant='success'
          type='submit'
        ) 登入
        b-btn.mx-1.w-100(
          v-else
          variant='success'
          type='submit'
        ) 註冊

      .text-wrap.text-center
        p(v-if="isLoginPage") 還沒有帳號嗎 ?
          a(href="#" @click.prevent='switchLoginPage') 註冊
        p(v-else) 已有帳號 !
          a(href="#" @click.prevent='switchLoginPage') 登入
</template>
<script>
export default {
  name: 'Navbar',
  data () {
    return {
      username: '',
      email: '',
      password: '',
      password2: '',
      isLoginPage: true,
      resMessage: ''
    }
  },
  computed: {
    usernameState () {
      const nameLength = this.username.length
      if (nameLength === 0) return null
      if (nameLength < 4 || nameLength > 30) return false
      return true
    },
    emailState () {
      const emailRule = /^\w+((-\w+)|(\.\w+))*@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/

      if (this.email.length === 0) return null
      if (!emailRule.test(this.email)) return false
      return true
    },
    passwordState () {
      const passwordRule = /^[a-zA-Z0-9]{6,50}$/

      if (this.password.length === 0) return null
      if (!passwordRule.test(this.password)) return false
      return true
    },
    password2State () {
      const result = this.password === this.password2

      if (this.password2.length === 0) return null
      if (!result) return false
      return true
    }
  },
  methods: {
    switchLoginPage () {
      this.isLoginPage = !this.isLoginPage
      this.username = ''
      this.email = ''
      this.password = ''
      this.password2 = ''
      this.resMessage = ''
    },
    onSubmit () {
      if (this.isLoginPage) {
        if (!this.emailState || !this.passwordState) return

        const data = {
          email: this.email,
          password: this.password
        }

        this.axios.post(process.env.VUE_APP_API + '/users/login', data)
          .then(res => {
            if (!res.data.success) {
              console.log(res.data.message)
              this.resMessage = res.data.message
              return
            }

            this.$store.commit('login', res.data.result)
            this.resMessage = '登入成功'
          })
          .catch(error => {
            console.log(error)
            this.resMessage = error.response.data.message
          })
      } else {
        if (!this.usernameState || !this.emailState || !this.passwordState || !this.password2State) return

        const data = {
          email: this.email,
          password: this.password,
          username: this.username
        }

        this.axios.post(process.env.VUE_APP_API + '/users/', data)
          .then(res => {
            if (!res.data.success) {
              console.log(res.data.message)
              this.resMessage = res.data.message
              return
            }

            this.resMessage = '註冊成功'
          })
          .catch(error => {
            console.log(error)
            this.resMessage = error.response.data.message
          })
      }
    }
    // login () {
    //   if (!this.emailState || !this.passwordState) return

    //   const data = {
    //     email: this.email,
    //     password: this.password
    //   }
    //   this.axios.post(process.env.VUE_APP_API + '/users/login', data)
    //     .then(res => {
    //       if (!res.data.success) {
    //         console.log(res.data.message)
    //         this.resMessage = res.data.message
    //         return
    //       }
    //       this.$store.commit('login', res.data.result)
    //       this.$router.push('/')
    //     })
    //     .catch(error => {
    //       console.log(error)
    //       this.resMessage = error.response.data.message
    //     })
    // },
    // signup () {
    //   if (!this.usernameState || !this.emailState || !this.passwordState || !this.password2State) return

    //   const data = {
    //     email: this.email,
    //     password: this.password,
    //     username: this.username
    //   }
    //   console.log(data)
    //   this.axios.post(process.env.VUE_APP_API + '/users', data)
    //     .then(res => {
    //       console.log(res.data.message)
    //       this.resMessage = res.data.message
    //     })
    //     .catch(error => {
    //       console.log(error)
    //       this.resMessage = error.response.data.message
    //     })
    // }
  }
}
</script>
