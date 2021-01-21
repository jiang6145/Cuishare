import express from 'express'
import formDataType from '../middlewares/formDataType.js'

import {
  articleImageUpload,
  getArticleImage,
  deleteArticleImage,
  userPhotoUpload,
  getUserPhoto
} from '../controllers/pictures.js'

const router = express.Router()
router.post('/article', formDataType, articleImageUpload)
router.get('/article/:filename', getArticleImage)
router.delete('/article/:filename', deleteArticleImage)
router.post('/user/', formDataType, userPhotoUpload)
router.get('/user/:filename', getUserPhoto)

export default router
