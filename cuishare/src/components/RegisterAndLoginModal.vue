<template lang="pug">
  b-modal#registerAndLoginModal(centered no-close-on-backdrop hide-footer hide-header)
    button.close(type='button' aria-label='Close' @click="hideModal") ×

    .title
      h2 Cuishare

    ValidationObserver(v-slot='{ handleSubmit }' ref="registerAndLoginForm" tag="div")
      b-form#registerAndLoginForm(@submit.prevent="handleSubmit(onSubmit)")
        //- User Name
        ValidationProvider(
          v-if="!isLoginForm"
          rules="required|min:4|max:30"
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
            p.error-message {{ errors[0] }}

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
            p.error-message {{ errors[0] }}

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
            p.error-message {{ errors[0] }}

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
            p.error-message {{ errors[0] }}

        b-button.submit-btn(type='submit' v-if="isLoginForm") 登入
        b-button.submit-btn(type='submit' v-else) 註冊

      .text
        p(v-if="isLoginForm") 還沒有帳號嗎?
          a(href="#" @click.prevent="changeForm") 註冊
        p(v-else) 已有Cuishare帳號!
          a(href="#" @click.prevent="changeForm") 登入
</template>

<script>
import { ValidationProvider, ValidationObserver } from 'vee-validate'

export default {
  name: 'RegisterAndLoginModal',
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
      this.form.username = ''
      this.form.email = ''
      this.form.password = ''
      this.form.confirmPassword = ''
      this.$refs.registerAndLoginForm.reset()
    },
    changeForm () {
      this.isLoginForm = !this.isLoginForm
      this.resetForm()
    },
    hideModal () {
      this.$bvModal.hide('registerAndLoginModal')
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
