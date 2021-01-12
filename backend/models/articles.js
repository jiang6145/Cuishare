import mongoose from 'mongoose'

const Schema = mongoose.Schema

const articleSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 50
    },
    text: {
      type: String,
      required: true
    },
    coverPhotoUrl: {
      type: String,
      default: 'https://images.unsplash.com/photo-1505935428862-770b6f24f629?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1047&q=80'
    },
    createDate: {
      type: Date,
      default: Date.now,
      immutable: true
    },
    isPublish: {
      type: Boolean,
      required: true,
      default: false
    },
    isBlocked: {
      type: Boolean,
      default: false
    },
    category: {
      type: mongoose.ObjectId,
      ref: 'users'
    },
    tags: {
      type: [String]
    },
    author: {
      type: mongoose.ObjectId,
      ref: 'users',
      required: true,
      immutable: true
    },
    likes: [
      {
        type: mongoose.ObjectId,
        ref: 'users'
      }
    ],
    favorites: [
      {
        type: mongoose.ObjectId,
        ref: 'users'
      }
    ]
  },
  {
    versionKey: false
  }
)

const articles = mongoose.model('articles', articleSchema)

export default articles
