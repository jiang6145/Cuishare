import mongoose from 'mongoose'
import validator from 'validator'

const Schema = mongoose.Schema

const userSchema = new Schema(
  {
    account: {
      type: String,
      required: [true, '請輸入 Email'],
      unique: 'Email 已被使用',
      validate: {
        validator (value) {
          return validator.isEmail(value)
        },
        message: 'Email 格式錯誤'
      }
    },
    password: {
      type: String,
      required: [true, '請輸入密碼'],
      validate: {
        validator (value) {
          return validator.isStrongPassword(value)
        },
        message: '密碼安全度不足'
      }
    },
    name: {
      type: String,
      minlength: [4, '名稱最少需要 4 個字'],
      maxlength: [20, '名稱不能超過 20 個字'],
      required: [true, '請輸入名稱'],
      unique: true
    },
    about: {
      type: String,
      maxlength: [300, '關於介紹不能超過 300 個字']
    }
  },
  {
    versionKey: false
  }
)

const users = mongoose.model('users', userSchema)

export default users
