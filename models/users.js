import mongoose from 'mongoose'
import validator from 'validator'

const Schema = mongoose.Schema

const notificationSchema = new Schema(
  {
    text: {
      type: String,
      maxlength: 1024,
      trim: true
    },
    byUser: {
      type: Object
    },
    data: {
      type: Object
    },
    isRead: {
      type: Boolean,
      default: false
    },
    createDate: {
      type: Date,
      default: Date.now,
      immutable: true
    }
  }
)

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
      default: ''
    },
    about: {
      type: String,
      default: '',
      maxlength: 255
    },
    isAdmin: {
      type: Boolean,
      default: false,
      immutable: true
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
    }],
    notifications: [notificationSchema]
  },
  {
    versionKey: false
  }
)

const users = mongoose.model('users', userSchema)

export default users
