import express from 'express'

import {
  createUser,
  loginUser,
  logoutUser,
  heartbeat,
  updateUserInfo
} from '../controllers/users.js'

const router = express.Router()
router.post('/', createUser)
router.post('/login', loginUser)
router.delete('/logout', logoutUser)
router.get('/heartbeat', heartbeat)
router.patch('/:userId', updateUserInfo)

export default router
