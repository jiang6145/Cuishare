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
      default: 'https://media.istockphoto.com/vectors/silhouette-default-avatar-man-to-social-user-vector-id860639650'
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
