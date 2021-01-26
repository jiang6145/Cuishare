<template lang="pug">
.user-settings-input
  .input-header
    label.label-text {{ fieldname }}
    font-awesome-icon.icon(
      v-if="isDisabled && editable"
      @click="edit"
      :icon="['fas','pencil-alt']"
      size="lg"
      fixed-width
    )
    .button-group(v-if="!isDisabled && editable")
      b-button.btn.btn--submit.mr-2(
        variant="outline-warning"
        size="sm"
        @click="type !== 'password'? onSubmit() : passwordOnSubmit()"
      ) 保存
      b-button.btn.btn--cancel(
        variant="light"
        size="sm"
        @click="onCancel"
      ) 取消

  .input-content
    ValidationProvider(
      v-slot="{ errors, valid, dirty }"
      :rules="rules"
      :ref="inputname + '-valid'"
      :name="inputname"
      tag="div"
    )
      b-form-input(
        v-model="value"
        :name="inputname"
        :ref="inputname"
        :type="type"
        :placeholder="placeholder"
        :state="validState(errors, valid, dirty)"
        :disabled="isDisabled"
      )
      p.validate-message {{ errors[0] }}

    //- 如果是修改密碼
    ValidationProvider(
      v-if="type === 'password' && !isDisabled"
      v-slot="{ errors, valid, dirty }"
      :rules="rules"
      ref="new-password-valid"
      name="new-password"
      tag="div"
    )
      b-form-input(
        v-model="newPassword"
        :type="type"
        :state="validState(errors, valid, dirty)"
        :disabled="isDisabled"
        name="new-password"
        ref="new-password"
        placeholder="請輸入新的密碼"
      )
      p.validate-message {{ errors[0] }}

    //- 確認新密碼
    ValidationProvider(
      v-if="type === 'password' && newPassword"
      v-slot="{ errors, valid, dirty }"
      ref="confirm-new-password-valid"
      rules="required|confirmed:new-password"
      name="confirm-new-password"
      tag="div"
    )
      b-form-input(
        v-model="confirmNewPassword"
        :type="type"
        :state="validState(errors, valid, dirty)"
        :disabled="isDisabled"
        name="confirm-new-password"
        ref="confirm-new-password"
        placeholder="確認新的密碼"
      )
      p.validate-message {{ errors[0] }}

</template>

<script>
import { ValidationProvider } from 'vee-validate'

export default {
  name: 'SettingInput',
  components: {
    ValidationProvider
  },
  props: {
    data: String,
    fieldname: String,
    inputname: String,
    type: {
      type: String,
      default: 'text'
    },
    rules: String,
    placeholder: String,
    editable: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      isDisabled: true,
      value: this.data,
      newPassword: '',
      confirmNewPassword: ''
    }
  },
  computed: {
    user () {
      return this.$store.state.user
    }
  },
  methods: {
    edit () {
      if (!this.editable) return
      this.isDisabled = false
      this.$nextTick(() => this.$refs[this.inputname].focus())

      if (this.type === 'password') this.value = ''
    },
    onCancel () {
      console.log(this.$refs)
      if (this.type === 'password') {
        this.newPassword = ''
        this.confirmNewPassword = ''
      }

      this.value = this.data
      this.$refs[this.inputname + '-valid'].reset()
      this.isDisabled = true
    },
    async onSubmit (valid) {
      console.log('傳送')
      if (!this.$refs[this.inputname].state) return
      const data = { [this.inputname]: this.value }

      try {
        const res = await this.axios.patch(process.env.VUE_APP_API + '/users/' + this.user.id, data)
        const { success, result } = res.data
        if (!success) return

        const newData = {
          [this.inputname]: result[this.inputname]
        }

        this.$store.commit('updateUser', newData)
        this.$refs[this.inputname + '-valid'].reset()
        this.isDisabled = true
      } catch (error) {
        this.value = this.data
        this.$refs[this.inputname + '-valid'].reset()

        alert(error.response.data.message)
        console.log(error)
      }
    },
    async passwordOnSubmit () {
      if (!this.$refs[this.inputname].state ||
          !this.$refs['new-password'].state ||
          !this.$refs['confirm-new-password'].state
      ) return

      const data = {
        password: this.value,
        newPassword: this.newPassword
      }

      try {
        const res = await this.axios.patch(process.env.VUE_APP_API + '/users/' + this.user.id, data)
        if (!res.data.success) return

        this.$refs[this.inputname + '-valid'].reset()
        this.value = this.newPassword
        this.newPassword = ''
        this.confirmNewPassword = ''
        this.isDisabled = true
      } catch (error) {
        this.$refs[this.inputname + '-valid'].reset()
        this.$refs['new-password' + '-valid'].reset()
        this.$refs['confirm-new-password' + '-valid'].reset()
        this.value = ''
        this.newPassword = ''
        this.confirmNewPassword = ''

        alert(error.response.data.message)
        console.log(error)
      }
    },
    validState (errors, valid, dirty) {
      if (errors[0] && !valid) return false
      if (!errors[0] && dirty && valid) return true
      return null
    }
  }
}
</script>
