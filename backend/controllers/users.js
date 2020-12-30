import md5 from 'md5'

import users from '../models/users.js'
import validate from '../validators/users.js'

// 註冊使用者帳號
export const createUser = async (req, res, next) => {
  try {
    const { error } = validate(req.body, ['email', 'password', 'username'])
    if (error) return res.status(400).send({ success: false, message: error.message })

    const user = await users.findOne({ email: req.body.email }, 'email')
    if (user) return res.status(400).send({ success: false, message: 'email 已被使用' })

    await users.create({
      email: req.body.email,
      password: md5(req.body.password),
      username: req.body.username
    })
    res.status(200).send({ success: true, message: '' })
  } catch (error) {
    next(error)
  }
}

// 使用者登入
export const loginUser = async (req, res, next) => {
  try {
    const { error } = validate(req.body, ['email', 'password'])
    if (error) return res.status(400).send({ success: false, message: error.message })

    const user = await users.findOne({
      email: req.body.email,
      password: md5(req.body.password)
    }, '-password')
    if (!user) return res.status(400).send({ success: false, message: 'email 或密碼錯誤' })

    req.session.user = user
    res.status(200).send({ success: true, message: '', user })
  } catch (error) {
    next(error)
  }
}

// 使用者登出
export const logoutUser = async (req, res, next) => {
  try {
    if (!req.session.user) return res.status(500).send({ success: false, message: '未登入' })

    req.session.destroy(error => {
      if (error) return res.status(500).send({ success: false, message: '登出失敗' })

      res.clearCookie()
      res.status(200).send({ success: true, message: '登出成功' })
    })
  } catch (error) {
    next(error)
  }
}

// 發出請求避免有效期限自動登出
export const heartbeat = async (req, res, next) => {
  try {
    const isLogin = !!req.session.user
    res.status(200).send(isLogin)
  } catch (error) {
    next(error)
  }
}
