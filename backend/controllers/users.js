import md5 from 'md5'

import users from '../models/users.js'

// 註冊使用者帳號
export const createUser = async (req, res) => {
  if (!req.headers['content-type'] || !req.headers['content-type'].includes('application/json')) {
    res.status(400).send({ success: false, message: '資料格式不符合' })
    return
  }

  try {
    if (req.body.password.length < 6) {
      res.status(400).send({ success: false, message: '密碼最少需要 6 個字' })
    } else if (req.body.password.length > 20) {
      res.status(400).send({ success: false, message: '密碼不能超過 20 個字' })
    } else {
      await users.create({
        account: req.body.account,
        password: md5(req.body.password),
        name: req.body.name,
        about: req.body.about
      })

      res.status(200).send({ success: true, message: '' })
    }
  } catch (error) {
    if (error.name === 'ValidationError') {
      const key = Object.keys(error.errors)[0]
      const message = error.errors[key].message
      res.status(400).send({ success: false, message })
    } else if (error.name === 'MongoError' && error.code === 11000) {
      res.status(400).send({ success: false, message: 'Email 已被使用' })
    } else {
      res.status(500).send({ success: false, message: '伺服器錯誤' })
    }

    console.log(error)
  }
}

// 登入
export const loginUser = async (req, res) => {
  if (!req.headers['content-type'] || !req.headers['content-type'].includes('application/json')) {
    res.status(400).send({ success: false, message: '資料格式不符合' })
    return
  }

  try {
    const result = await users.findOne({
      account: req.body.account,
      password: md5(req.body.password)
    }, '-password')

    if (!result) {
      res.status(404).send({ success: false, message: '帳號或密碼錯誤' })
    } else {
      req.session.user = result
      res.status(200).send({ success: true, message: '' })
    }
  } catch (error) {
    if (error.name === 'ValidationError') {
      const key = Object.keys(error.errors)[0]
      const message = error.errors[key].message
      res.status(400).send({ success: false, message })
    } else {
      res.status(500).send({ success: false, message: '伺服器錯誤' })
    }

    console.log(error)
  }
}

// 登出
export const logoutUser = async (req, res) => {
  req.session.destroy(error => {
    if (error) {
      res.status(500).send({ success: false, message: '伺服器錯誤' })
    } else {
      res.clearCookie()
      res.status(200).send({ success: true, message: '' })
    }
  })
}

// 發出請求避免有效期限自動登出
export const heartbeat = async (req, res) => {
  const isLogin = !!req.session.user
  res.status(200).send(isLogin)
}
