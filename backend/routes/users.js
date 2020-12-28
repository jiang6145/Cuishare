import express from 'express'

import {
  createUser,
  deleteUser,
  loginUser,
  logoutUser,
  heartbeat
} from '../controllers/users.js'

const router = express.Router()
router.post('/', createUser)
router.patch('/:id', deleteUser)
router.post('/login', loginUser)
router.delete('/logout', logoutUser)
router.get('/heartbeat', heartbeat)

export default router
