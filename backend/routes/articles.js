import express from 'express'

import {
  createArticle,
  deleteArticle,
  getArticleAll,
  getAuthorArticles,
  getArticle,
  editArticle
  // likeArticle
} from '../controllers/articles.js'

const router = express.Router()
router.post('/', createArticle)
router.delete('/:articleId', deleteArticle)
router.get('/', getArticleAll)
router.get('/author/:authorId', getAuthorArticles)
router.get('/:articleId', getArticle)
router.patch('/:articleId', editArticle)
// router.patch('/likes/:articleId', likeArticle)

export default router
