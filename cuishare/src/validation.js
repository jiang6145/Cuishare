import axios from 'axios'
import { extend } from 'vee-validate'

import {
  required,
  email,
  min,
  max,
  confirmed,
  alpha_num as alphaNum
} from 'vee-validate/dist/rules'

extend('required', {
  ...required,
  message: (fieldName) => {
    if (fieldName === 'password') fieldName = '密碼'
    if (fieldName === 'username') fieldName = '用戶名稱'
    if (fieldName === 'confirmPassword') return '再輸入一次密碼'
    return `必須填寫${fieldName}`
  }
})

extend('email', {
  ...email,
  message: '請輸入正確的{_field_}'
})

extend('min', {
  ...min,
  message: (fieldName, placeholders) => {
    if (fieldName === 'password') fieldName = '密碼'
    if (fieldName === 'username') fieldName = '用戶名稱'
    return `${fieldName}不得少於${placeholders.length}個字`
  }
})

extend('max', {
  ...max,
  message: (fieldName, placeholders) => {
    if (fieldName === 'password') fieldName = '密碼'
    if (fieldName === 'username') fieldName = '用戶名稱'
    return `${fieldName}不得超過${placeholders.length}個字`
  }
})

extend('confirmed', {
  ...confirmed,
  message: '與密碼不符'
})

extend('alphaNum', {
  ...alphaNum,
  message: '密碼僅包含英文字或數字'
})

extend('emailUnique', {
  validate: async (value) => {
    try {
      const res = await axios.get(process.env.VUE_APP_API + '/users/' + value)
      return res.data.success
    } catch (error) {
      return error.response.data.success
    }
  },
  message: 'email 已被使用過'
})
