import express from 'express'
import formDataType from '../middlewares/formDataType.js'

import {
  articleImageUpload,
  getArticleImage,
  deleteArticleImage
} from '../controllers/pictures.js'

const router = express.Router()
router.post('/article', formDataType, articleImageUpload)
router.get('/article/:filename', getArticleImage)
router.delete('/article/:filename', deleteArticleImage)

export default router
