import express from 'express'

import {
  cerateComment,
  deleteComment,
  getComments
} from '../controllers/comments.js'

const router = express.Router()
router.post('/:articleId', cerateComment)
router.delete('/:commentId', deleteComment)
router.get('/:articleId', getComments)

export default router
