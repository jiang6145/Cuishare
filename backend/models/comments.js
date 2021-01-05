import mongoose from 'mongoose'

const Schema = mongoose.Schema

const commentSchema = new Schema(
  {
    content: {
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
    user_id: {
      type: mongoose.ObjectId,
      ref: 'users',
      required: true,
      immutable: true
    },
    article_id: {
      type: mongoose.ObjectId,
      ref: 'articles',
      required: true,
      immutable: true
    }
  },
  {
    versionKey: false
  }
)

const comments = mongoose.model('comments', commentSchema)

export default comments
