<template lang="pug">
  .user-settings
    b-container
      b-row
        b-col.mx-auto(cols="12" lg="8")
          .user-settings__title 個人資料
            span.tag.no-hover(v-if="user.isBlocked") 帳號已被封鎖
          b-form.user-settings-photo(
            @submit.prevent="photoOnSubmit"
            @reset.prevent="photoOnCancel"
          )
            .input-header
              label.label-text 你的照片
              .user-settings__button-group(v-if="isPhotChange")
                b-button.custom-btn.mr-2(
                  type="submit"
                  variant="outline-warning"
                  size="sm"
                ) 保存
                b-button.custom-btn(
                  type="reset"
                  variant="outline-secondary"
                  size="sm"
                ) 取消
            img-inputer.mx-auto(
              :img-src="this.$store.state.user.photoUrl"
              :max-size="1024"
              @onChange="photOnChange"
              icon="img"
              ref="img-inputer"
              v-model="userPhoto"
              placeholder="請選擇照片"
              bottom-text="變更你的照片"
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
          data: '123456789',
          fieldname: '密碼',
          inputname: 'password',
          type: 'password',
          rules: 'required|alphaNum|min:6|max:30',
          placeholder: '請輸入原本的密碼'
        },
        {
          data: this.$store.state.user.username,
          fieldname: '你的暱稱',
          inputname: 'username',
          type: 'text',
          rules: 'required|min:4|max:30|bannedName',
          placeholder: '請輸入暱稱'
        },
        {
          data: this.$store.state.user.about,
          fieldname: '關於你',
          inputname: 'about',
          type: 'text',
          rules: 'max:255',
          placeholder: '請輸入關於你的介紹'
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

        if (currentPhotoFilename) await this.axios.delete(process.env.VUE_APP_API + '/pictures/' + currentPhotoFilename)

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
