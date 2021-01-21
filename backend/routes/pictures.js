import express from 'express'
import formDataType from '../middlewares/formDataType.js'

import {
  imageUpload,
  getImage,
  deleteImage
} from '../controllers/pictures.js'

const router = express.Router()
router.post('/', formDataType, imageUpload)
router.get('/:filename', getImage)
router.delete('/:filename', deleteImage)

export default router
