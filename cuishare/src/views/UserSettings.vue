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
            b-form.user-info__photo(@submit.prevent="photoOnSubmit" @reset.prevent="photoOnCancel")
              .user-info__photo
                .header
                  label 你的照片
                  b-button-group(v-if="isPhotChange")
                    b-button(type="submit" variant="outline-success" size="sm") 確認
                    b-button(type="reset" variant="outline-danger" size="sm") 取消
                img-inputer.mx-auto(
                  :img-src="this.$store.state.user.photoUrl"
                  :max-size="1024"
                  @onChange="photOnChange"
                  icon="img"
                  ref="img-inputer"
                  v-model="userPhoto"
                  placeholder="請選擇照片"
                  bottom-text="編輯你的照片"
                  no-multiple-text=true
                  exceedSizeText="檔案大小不能超過1MB"
                  accept="image/*"
                )

            SettingInput(
              v-for="item in settingInputDatas"
              :data="item.data"
              :fieldname="item.fieldname"
              :inputname="item.inputname"
              :type="item.type"
              :rules="item.rules"
              :placeholder="item.placeholder"
              :editable="item.editable"
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
      userPhoto: null,
      isPhotChange: false,
      settingInputDatas: [
        {
          data: this.$store.state.user.email,
          fieldname: '你的帳號',
          inputname: 'email',
          type: 'text',
          editable: false
        },
        {
          data: this.$store.state.user.username,
          fieldname: '你的名稱',
          inputname: 'username',
          type: 'text',
          rules: 'required|min:4|max:30|bannedName',
          placeholder: '請輸入用戶名稱'
        },
        {
          data: this.$store.state.user.about,
          fieldname: '關於你',
          inputname: 'about',
          type: 'text',
          rules: 'max:255',
          placeholder: '請輸入關於你的介紹'
        },
        {
          data: '123456789',
          fieldname: '密碼',
          inputname: 'password',
          type: 'password',
          rules: 'required|alphaNum|min:6|max:30',
          placeholder: '請輸入原本的密碼'
        }
      ]
    }
  },
  computed: {
    user () {
      return this.$store.state.user
    }
  },
  methods: {
    photOnChange () {
      this.isPhotChange = true
    },
    async photoOnSubmit () {
      const userId = this.user.id
      const currentPhotoUrl = this.user.photoUrl.split('/')
      const currentPhotoFilename = currentPhotoUrl[currentPhotoUrl.length - 1]

      const formData = new FormData()
      formData.append('image', this.userPhoto)

      try {
        const newPhoto = await this.axios.post(process.env.VUE_APP_API + '/pictures', formData)

        const photoData = {
          photoUrl: process.env.VUE_APP_API + '/pictures/' + newPhoto.data.filename
        }
        await this.axios.patch(process.env.VUE_APP_API + '/users/' + userId, photoData)
        this.$store.commit('updateUser', photoData)

        await this.axios.delete(process.env.VUE_APP_API + '/pictures/' + currentPhotoFilename)

        this.$refs['img-inputer'].fileName = ''
        this.isPhotChange = false
      } catch (error) {
        console.log(error)
      }
    },
    photoOnCancel () {
      this.$refs['img-inputer'].dataUrl = this.$store.state.user.photoUrl
      this.$refs['img-inputer'].fileName = ''
      this.isPhotChange = false
    }
  }
}
</script>
