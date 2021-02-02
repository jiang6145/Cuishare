import express from 'express'
import jsonType from '../middlewares/jsonType.js'

import {
  getNotifications,
  sendNotifications
  // readNotifications,
  // deleteNotifications
} from '../controllers/notifications.js'

const router = express.Router()
router.get('/', getNotifications)
router.post('/', jsonType, sendNotifications)
// router.path('/', jsonType, readNotifications)
// router.delete('/', jsonType, deleteNotifications)

export default router
