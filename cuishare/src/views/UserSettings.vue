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
              v-for="(item) in array"
              :data="item.data"
              :fieldname="item.fieldname"
              :inputname="item.inputname"
              :type="item.type"
              :rules="item.rules"
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
      isDisabled: true,
      array: [
        { data: 'Jiang', fieldname: '用戶名稱1', inputname: 'username1', rules: 'required|min:4|max:30|bannedName' },
        { data: 'Milk', fieldname: '用戶名稱2', inputname: 'username2', rules: 'required|min:4|max:30|bannedName' }
      ]
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
