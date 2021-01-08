import mongoose from 'mongoose'

const Schema = mongoose.Schema

const repliesSchema = new Schema(
  {
    text: {
      type: String,
      maxlength: 1024,
      trim: true
    },
    byUser: {
      type: mongoose.ObjectId,
      ref: 'users'
    }
  }
)

const commentSchema = new Schema(
  {
    text: {
      type: String,
      required: true,
      trim: true,
      maxlength: 1024
    },
    createDate: {
      type: Date,
      required: true,
      default: Date.now
    },
    byUser: {
      type: mongoose.ObjectId,
      ref: 'users',
      required: true,
      immutable: true
    },
    byArticle: {
      type: mongoose.ObjectId,
      ref: 'articles',
      required: true,
      immutable: true
    },
    articleAuthor: {
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
    replies: [repliesSchema]
  },
  {
    versionKey: false
  }
)

const comments = mongoose.model('comments', commentSchema)

export default comments
