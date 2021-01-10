import { extend } from 'vee-validate'
import { required, email, min, max } from 'vee-validate/dist/rules'
// alpha_num, alpha_dash
extend('required', {
  ...required,
  message: '必須填寫{_field_}'
})

extend('email', {
  ...email,
  message: '請輸入正確的{_field_}'
})

extend('min', {
  ...min,
  message: '{_field_}不得少於{length}個字'
})

extend('max', {
  ...max,
  message: '{_field_}不得超過{length}個字'
})
