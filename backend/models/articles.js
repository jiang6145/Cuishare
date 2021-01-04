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
      required: true
    },
    date: {
      type: Date,
      required: true,
      default: new Date()
    },
    isPost: {
      type: Boolean,
      required: true
    },
    like: {
      type: Number,
      default: 0,
      min: 0
    },
    favorite: {
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
