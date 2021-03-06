<template lang="pug">
  b-modal#user-modal.user-modal(
    @hidden="resetModal"
    @show="resetModal"
    centered
    hide-footer
    no-close-on-backdrop
  )

    ValidationObserver(v-slot='{ handleSubmit }' ref="registerAndLoginForm" tag="div")
      b-form#register-and-login-form(@submit.prevent="handleSubmit(onSubmit)")
        //- User Name
        ValidationProvider(
          v-if="!isLoginModal"
          rules="required|min:4|max:30|bannedName"
          v-slot="{ errors, valid, dirty }"
          name="username"
          tag="div"
        )
          b-form-group(for="username")
            b-form-input(
              name="username"
              type="text"
              v-model="form.username"
              placeholder="你的暱稱 (可以更改)"
              :state="validState(errors, valid, dirty)"
            )
            p.validate-message {{ errors[0] }}

        //- Email
        ValidationProvider(
          :rules="'required|email'+ `${!isLoginModal ? '|emailUnique' : ''}`"
          v-slot="{ errors, valid, dirty }"
          name="email"
          vid="email"
          tag="div"
        )
          b-form-group(for="email")
            b-form-input(
              name="email"
              type="text"
              v-model="form.email"
              placeholder="Email"
              :state="validState(errors, valid, dirty)"
            )
            p.validate-message {{ errors[0] }}

        //- Password
        ValidationProvider(
          rules="required|alphaNum|min:6|max:30"
          v-slot="{ errors, valid, dirty }"
          name="password"
          ref="password"
          tag="div"
        )
          b-form-group
            b-form-input(
              type="password"
              v-model="form.password"
              placeholder="密碼"
              :state="validState(errors, valid, dirty)"
            )
            p.validate-message {{ errors[0] }}

        //- 確認 Password
        ValidationProvider(
          v-if="!isLoginModal"
          rules="required|confirmed:password"
          v-slot="{ errors, valid, dirty }"
          name="confirmPassword"
          tag="div"
        )
          b-form-group
            b-form-input(
              type="password"
              v-model="form.confirmPassword"
              placeholder="確認密碼"
              :state="validState(errors, valid, dirty)"
            )
            p.validate-message {{ errors[0] }}

        b-button.custom-btn.user-modal__btn-submit(
          type='submit'
          variant="outline-warning"
          size="sm"
        ) {{ isLoginModal ? '登入' : '註冊' }}

      .user-modal__footer
        p {{ isLoginModal ? '還沒有帳號嗎?' : '已有Cuishare帳號!' }}
          a(href="#" @click.prevent="toggleModal") {{ isLoginModal ? '註冊' : '登入' }}
</template>

<script>
import { ValidationProvider, ValidationObserver } from 'vee-validate'

export default {
  name: 'UserModal',
  components: {
    ValidationProvider,
    ValidationObserver
  },
  data () {
    return {
      form: {
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
      }
    }
  },
  computed: {
    isLoginModal () {
      return this.$store.state.isLoginModal
    }
  },
  methods: {
    async onSubmit () {
      try {
        if (this.isLoginModal) {
          // 登入
          const { email, password } = this.form
          const loginData = {
            email,
            password
          }

          const res = await this.axios.post(process.env.VUE_APP_API + '/users/login', loginData)
          const { success, result } = res.data

          if (success) {
            this.$toasted.success('登入成功，歡迎回來 Cuishae')
            this.$store.commit('login', result)
          }
        } else {
          // 註冊
          const { username, email, password } = this.$data.form
          const registerData = {
            username,
            email,
            password
          }
          const res = await this.axios.post(process.env.VUE_APP_API + '/users', registerData)
          const { success, message } = res.data

          if (success) {
            this.$toasted.success(message)
            const loginData = {
              email,
              password
            }
            const res = await this.axios.post(process.env.VUE_APP_API + '/users/login', loginData)
            if (res.data.success) this.$store.commit('login', res.data.result)
          }
        }
        this.$bvModal.hide('user-modal')
      } catch (error) {
        this.$refs.registerAndLoginForm.reset()
        this.$toasted.error(error.response.data.message)
        console.log(error)
      }
    },
    resetModal () {
      this.form.username = ''
      this.form.email = ''
      this.form.password = ''
      this.form.confirmPassword = ''
    },
    toggleModal () {
      this.$store.commit('toggleModal', !this.isLoginModal)
      this.$refs.registerAndLoginForm.reset() // 清空驗證狀態
      this.resetModal()
    },
    validState (errors, valid, dirty) {
      if (errors[0] && !valid) return false
      if (!errors[0] && dirty && valid) return true
      return null
    }
  }
}
</script>

<style lang="scss">
#user-modal{
    &::before{
    background: url('../plugins/images/side-panels.png') no-repeat center / cover;
  }
}
</style>
