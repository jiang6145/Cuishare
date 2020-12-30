import express from 'express'

import {
  createUser,
  loginUser,
  logoutUser,
  heartbeat,
  updateAbout
} from '../controllers/users.js'

const router = express.Router()
router.post('/', createUser)
router.post('/login', loginUser)
router.delete('/logout', logoutUser)
router.get('/heartbeat', heartbeat)
router.patch('/about/:id', updateAbout)

export default router
