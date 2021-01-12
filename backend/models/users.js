import mongoose from 'mongoose'
import validator from 'validator'

const Schema = mongoose.Schema

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      immutable: true,
      validate: {
        validator: value => validator.isEmail(value)
      }
    },
    password: {
      type: String,
      required: true
    },
    username: {
      type: String,
      required: true,
      minlength: 4,
      maxlength: 30
    },
    photoUrl: {
      type: String,
      default: 'https://ae01.alicdn.com/kf/H4e4028d380bc45b58e7c2abb9fa499d8F.jpg'
    },
    about: {
      type: String,
      maxlength: 255
    },
    isAdmin: {
      type: Boolean,
      default: false
    },
    isBlocked: {
      type: Boolean,
      default: false
    },
    createDate: {
      type: Date,
      default: Date.now,
      immutable: true
    },
    following: [
      {
        type: mongoose.ObjectId,
        ref: 'users'
      }
    ],
    followers: [
      {
        type: mongoose.ObjectId,
        ref: 'users'
      }
    ],
    articleCategory: [{
      categoryName: String
    }]
  },
  {
    versionKey: false
  }
)

const users = mongoose.model('users', userSchema)

export default users
