import express from 'express'
import jsonType from '../middlewares/jsonType.js'

import {
  cerateComment,
  deleteComment,
  getComments,
  likeComment,
  addReply,
  removeReply
} from '../controllers/comments.js'

const router = express.Router()
router.post('/:articleId', jsonType, cerateComment)
router.delete('/:commentId', deleteComment)
router.get('/:articleId', getComments)
router.patch('/likes/:commentId', likeComment)
router.patch('/reply/:commentId', jsonType, addReply)
router.patch('/reply/:commentId/:replyId', jsonType, removeReply)

export default router
