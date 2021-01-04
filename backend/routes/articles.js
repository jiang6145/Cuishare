import express from 'express'

import {
  createArticle,
  deleteArticle,
  getArticleAll,
  getAuthorArticles,
  getArticle
} from '../controllers/articles.js'

const router = express.Router()
router.post('/', createArticle)
router.delete('/:articleId', deleteArticle)
router.get('/', getArticleAll)
router.get('/:authorId/author', getAuthorArticles)
router.get('/:articleId', getArticle)

export default router
