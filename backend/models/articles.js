import mongoose from 'mongoose'

const Schema = mongoose.Schema

const articleSchema = new Schema(
  {
    title: {
      type: String,
      trim: true,
      maxlength: 50
    },
    subTitle: {
      type: String
    },
    text: {
      type: String
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
      default: false
    },
    isUnlisted: {
      type: Boolean,
      default: false
    },
    isDraft: {
      type: Boolean,
      default: true
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
