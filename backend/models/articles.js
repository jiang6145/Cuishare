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
      type: String
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
