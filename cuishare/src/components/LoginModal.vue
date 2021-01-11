<template lang="pug">
  b-modal#loginModal(centered no-close-on-backdrop hide-footer hide-header)
    button.close(type='button' aria-label='Close' @click="$bvModal.hide('loginModal')") ×

    .title
      h2 Cuishare

    //- ValidationObserver#loginForm(tag="form" ref="loginForm" @submit.stop.prevent="onSubmit")
    ValidationObserver(v-slot='{ handleSubmit }' ref="loginForm" tag="div")
      form#loginForm(@submit.prevent="handleSubmit(onSubmit)")
        //- User Name
        ValidationProvider(v-if="!isLoginForm" rules="required|min:4|max:30" v-slot="{ errors }" name="username" tag="div")
          b-form-group(for="username")
            b-form-input(
              name="username"
              type="text"
              v-model="form.username"
              placeholder="用戶名稱"
            )
            p.error-message {{ errors[0] }}

        //- Email
        ValidationProvider(rules="required|email" v-slot="{ errors }" name="Email" tag="div")
          b-form-group(for="email")
            b-form-input(
              name="email"
              type="text"
              v-model="form.email"
              placeholder="Email"
            )
            p.error-message {{ errors[0] }}

        //- Password
        ValidationProvider(
          rules="required|alphaNum|min:6|max:30"
          v-slot="{ errors }"
          name="password"
          ref="password"
          tag="div"
        )
          b-form-group
            b-form-input(
              type="password"
              v-model="form.password"
              placeholder="密碼"
            )
            p.error-message {{ errors[0] }}

        //- 確認 Password
        ValidationProvider(
          v-if="!isLoginForm"
          rules="required|confirmed:password"
          v-slot="{ errors }"
          name="confirmPassword"
          tag="div"
        )
          b-form-group
            b-form-input(
              type="password"
              v-model="form.confirmPassword"
              placeholder="確認密碼"
            )
            p.error-message {{ errors[0] }}

        b-button.submit-btn(type='submit' v-if="isLoginForm") 登入
        b-button.submit-btn(type='submit' v-else) 註冊

      .text
        p(v-if="isLoginForm") 還沒有帳號嗎?
          a(href="#" @click.prevent="changeForm") 註冊
        p(v-else) 已有Cuishare帳號
          a(href="#" @click.prevent="changeForm") 登入
</template>

<script>
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import '../validation.js'

export default {
  name: 'LoginModal',
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
      },
      isLoginForm: true
    }
  },
  computed: {
  },
  methods: {
    async onSubmit () {
      console.log('送出')
    },
    resetForm () {
      this.form.email = ''
      this.form.password = ''
      this.form.confirmPassword = ''
    },
    changeForm () {
      this.isLoginForm = !this.isLoginForm
    }
  }
}
</script>
