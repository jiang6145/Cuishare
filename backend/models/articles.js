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
    content: {
      type: String,
      required: true
    },
    author_id: {
      type: mongoose.ObjectId,
      ref: 'users',
      required: true,
      immutable: true
    },
    createDate: {
      type: Date,
      required: true,
      default: Date.now
    },
    isPublish: {
      type: Boolean,
      required: true,
      default: false
    },
    likes: {
      type: Number,
      default: 0,
      min: 0
    },
    favorites: {
      type: Number,
      default: 0,
      min: 0
    },
    tags: {
      type: [String]
    }
  },
  {
    versionKey: false
  }
)

const articles = mongoose.model('articles', articleSchema)

export default articles
