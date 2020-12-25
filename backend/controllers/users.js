import md5 from 'md5'

import users from '../models/users.js'

export const createUser = async (req, res) => {
  if (!req.headers['content-type'] || !req.headers['content-type'].includes('application/json')) {
    res.status(400).send({ success: false, message: '資料格式不符' })
    return
  }

  try {
    if (req.body.password.length < 6) {
      res.status(400).send({ success: false, message: '密碼最少需要 6 個字' })
    } else if (req.body.password.length > 20) {
      res.status(400).send({ success: false, message: '密碼名稱不能超過 20 個字' })
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
    // console.log(Object.keys(error.keyValue)[0] === 'name')
  }
}
