<template lang="pug">
#user-settings
  b-container
    b-row
      b-col.side(cols="12" lg="3")
        .menu
          .menu__title 設定
          ul.menu__list
            li.menu__list__item 個人資料

      b-col.content(cols="12" lg="9")
        .settings
          .user-info
            .user-info__title 個人資料
            SettingInput(
              :data="'測試1'"
              :fieldname="'測試1'"
              :inputname="'測試1'"
              :type="'password'"
              :rules="'required|min:4|max:30|bannedName'"
            )
            SettingInput(
              :data="'123456798'"
              :fieldname="'測試2'"
              :inputname="'測試2'"
            )

</template>

<script>
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import SettingInput from '../components/SettingInput'

export default {
  name: 'UserSettings',
  components: {
    ValidationProvider,
    ValidationObserver,
    SettingInput
  },
  data () {
    return {
      isDisabled: true
    }
  },
  computed: {
    user () {
      return this.$store.state.user
    }
  },
  methods: {
    edit () {
      this.isDisabled = !this.isDisabled
      // 等待 DOM 元素更新完後, 對 username-1 input 執行 focus()
      this.$nextTick(() => this.$refs['username-1'].focus())
    },
    validState (errors, valid, dirty) {
      if (errors[0] && !valid) return false
      if (!errors[0] && dirty && valid) return true
      return null
    }
  }
}
</script>
