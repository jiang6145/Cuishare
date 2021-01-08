import express from 'express'

import jsonType from '../middlewares/jsonType.js'
import {
  createUser,
  loginUser,
  logoutUser,
  updateUserInfo,
  followUser,
  heartbeat,
  addArticleCategory,
  removeArticleCategory,
  updateArticleCategory
} from '../controllers/users.js'

const router = express.Router()
router.post('/', jsonType, createUser)
router.post('/login', jsonType, loginUser)
router.delete('/logout', logoutUser)
router.patch('/:userId', jsonType, updateUserInfo)
router.patch('/follow/:userId', followUser)
router.get('/heartbeat', heartbeat)
router.post('/category/:userId', jsonType, addArticleCategory)
router.delete('/category/:categoryId', removeArticleCategory)
router.patch('/category/:categoryId', jsonType, updateArticleCategory)

export default router
