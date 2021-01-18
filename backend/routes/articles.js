import express from 'express'
import jsonType from '../middlewares/jsonType.js'
import formDataType from '../middlewares/formDataType.js'

import {
  createArticle,
  deleteArticle,
  getArticleAll,
  getAuthorArticles,
  getArticle,
  editArticle,
  changeArticleCategory,
  likeArticle,
  favoriteArticle,
  articleImageUpload
} from '../controllers/articles.js'

const router = express.Router()
router.post('/', jsonType, createArticle)
router.delete('/:articleId', deleteArticle)
router.patch('/:articleId', jsonType, editArticle)
router.patch('/category/:articleId/:categoryId', changeArticleCategory)
router.get('/', getArticleAll)
router.get('/author/:authorId', getAuthorArticles)
router.get('/:articleId', getArticle)
router.patch('/likes/:articleId', likeArticle)
router.patch('/favorites/:articleId', favoriteArticle)
router.post('/imageUpload', formDataType, articleImageUpload)

export default router
