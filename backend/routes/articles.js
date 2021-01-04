import express from 'express'

import {
  createArticle,
  getArticleAll
} from '../controllers/articles.js'

const router = express.Router()
router.post('/', createArticle)
router.get('/', getArticleAll)

export default router
