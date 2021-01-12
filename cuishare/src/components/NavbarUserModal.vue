<template lang="pug">
  b-modal#navbar-user-modal(centered hide-footer hide-header)
    button.close-button(type='button' @click="hideModal") ×

    .modal-title
      h2 Cuishare

    ValidationObserver(v-slot='{ handleSubmit }' ref="registerAndLoginForm" tag="div")
      b-form#register-and-login-form(@submit.prevent="handleSubmit(onSubmit)")
        //- User Name
        ValidationProvider(
          v-if="!isLoginForm"
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
              placeholder="用戶名稱 (可以更改)"
              :state="validState(errors, valid, dirty)"
            )
            p.validation-error-message {{ errors[0] }}

        //- Email
        ValidationProvider(
          :rules="'required|email'+ `${!isLoginForm ? '|emailUnique' : ''}`"
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
            p.validation-error-message {{ errors[0] }}

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
            p.validation-error-message {{ errors[0] }}

        //- 確認 Password
        ValidationProvider(
          v-if="!isLoginForm"
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
            p.validation-error-message {{ errors[0] }}

        p.res-message(:style="{color: resMessageColor}") {{ resMessage }}
        b-button.submit-button(type='submit') {{ isLoginForm ? '登入' : '註冊' }}

      .modal-footer-text
        p {{ isLoginForm ? '還沒有帳號嗎?' : '已有Cuishare帳號!' }}
          a(href="#" @click.prevent="changeForm") {{ isLoginForm ? '註冊' : '登入' }}
</template>

<script>
import { ValidationProvider, ValidationObserver } from 'vee-validate'

export default {
  name: 'NavbarUserModal',
  components: {
    ValidationProvider,
    ValidationObserver
  },
  props: {
    isLoginForm: Boolean
  },
  data () {
    return {
      form: {
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
      },
      resMessage: '',
      resMessageColor: ''
    }
  },
  methods: {
    async onSubmit () {
      console.log('送出')
      let message = ''
      try {
        if (this.isLoginForm) {
          const { email, password } = this.$data.form
          const loginData = {
            email,
            password
          }
          const res = await this.axios.post(process.env.VUE_APP_API + '/users/login', loginData)

          message = res.data.message
          this.$store.commit('login', res.data.result)
        } else {
          const { username, email, password } = this.$data.form
          const registerData = {
            username,
            email,
            password
          }
          const res = await this.axios.post(process.env.VUE_APP_API + '/users', registerData)
          message = res.data.message
        }

        this.resMessageColor = 'green'
        this.resMessage = message
        // this.hideModal()
      } catch (error) {
        this.resMessageColor = 'red'
        this.resMessage = error.response.data.message
      }
    },
    resetForm () {
      this.form.username = ''
      this.form.email = ''
      this.form.password = ''
      this.form.confirmPassword = ''
      this.$refs.registerAndLoginForm.reset()
      this.resMessage = ''
    },
    changeForm () {
      this.$emit('changeForm', !this.isLoginForm)
      this.resetForm()
    },
    hideModal () {
      this.$bvModal.hide('navbar-user-modal')
      this.resetForm()
    },
    validState (errors, valid, dirty) {
      if (errors[0] && !valid) return false
      if (!errors[0] && dirty && valid) return true
      return null
    }
  }
}
</script>
