import validator from 'validator'
import md5 from 'md5'

import users from '../models/users.js'

export const createUser = async (req, res) => {
  if (!req.headers['content-type'] || !req.headers['content-type'].includes('application/json')) {
    res.status(400).send({ success: false, message: '資料格式不符' })
    return
  }

  try {
    if (!validator.isEmail(req.body.account)) {
      res.status(400).send({ success: false, message: '請輸入正確的 Email' })
    } else if (!validator.isStrongPassword(req.body.password)) {
      res.status(400).send({ success: false, message: '密碼安全度不足' })
    } else if (req.body.name.length < 4) {
      res.status(400).send({ success: false, message: '名稱最少需要 4 個字' })
    } else if (req.body.name.length < 20) {
      res.status(400).send({ success: false, message: '名稱不能超過 20 個字' })
    } else {
      await users.create({
        account: req.body.account,
        password: req.body.password,
        name: req.body.name,
        about: req.body.about || null
      })
    }
  } catch (error) {
    if (error.name === 'ValidationError') {
      const key = Object.keys(error.errors)[0]
      const message = error.errors[key].message
      res.status(400).send({ success: false, message })
    } else if (error.account === 'MongoError' && error.code === 11000) {
      res.status(400).send({ success: false, message: '帳號已使用' })
    } else {
      res.status(500).send({ success: false, message: '伺服器錯誤' })
    }

    console.log(error)
  }
}
