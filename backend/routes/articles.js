import express from 'express'
import jsonType from '../middlewares/jsonType.js'

import {
  createArticle,
  deleteArticle,
  getArticleAll,
  getAuthorArticles,
  getArticle,
  searchArticle,
  editArticle,
  changeArticleCategory,
  likeArticle,
  favoriteArticle,
  blockadeArticle
} from '../controllers/articles.js'

const router = express.Router()
router.post('/', jsonType, createArticle)
router.delete('/:articleId', deleteArticle)
router.patch('/:articleId', jsonType, editArticle)
router.patch('/category/:articleId/:categoryId', changeArticleCategory)
router.get('/', getArticleAll)
router.get('/author/:authorId', getAuthorArticles)
router.get('/:articleId', getArticle)
router.get('/search/:searchValue', searchArticle)
router.patch('/likes/:articleId', likeArticle)
router.patch('/favorites/:articleId', favoriteArticle)
router.patch('/blockade/:articleId', blockadeArticle)

export default router
