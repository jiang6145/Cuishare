<template lang="pug">
  b-modal#loginModal(centered no-close-on-backdrop hide-footer hide-header)
    button.close(type='button' aria-label='Close' @click="$bvModal.hide('loginModal')") ×

    .text-wrap.text-center
      h2 Cuishare

    //- ValidationObserver#loginForm(tag="form" ref="loginForm" @submit.stop.prevent="onSubmit")
    ValidationObserver(v-slot='{ handleSubmit, reset }' ref="loginForm")
      form#loginForm(@submit.prevent="handleSubmit(onSubmit)" @reset.prevent="reset")
        ValidationProvider(rules="required|email" v-slot="{ errors }" name="Email" tag="div")
          b-form-group(for="email")
            b-form-input(
              name="email"
              type="text"
              v-model="form.email"
              placeholder="Email"
            )
            p.error-message {{ errors[0] }}

        ValidationProvider(rules="required|min:6|max:30" v-slot="{ errors }" name="password" tag="div" )
          b-form-group
            b-form-input(
              type="password"
              v-model="form.password"
              placeholder="密碼"
            )
            p.error-message {{ errors[0] }}

        b-button.w-100(type='submit') 登入

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
        email: '',
        password: ''
      }
    }
  },
  methods: {
    async onSubmit () {
      console.log('送出')
    },
    resetForm () {
      this.form.email = ''
      this.form.password = ''
    }
  }
}
</script>
