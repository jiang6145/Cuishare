import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import connectMongo from 'connect-mongo'
import cors from 'cors'
import session from 'express-session'

import userRouter from './routes/users.js'

dotenv.config()
mongoose.connect(process.env.DBURL, { useNewUrlParser: true, useUnifiedTopology: true })

const app = express()

app.use(bodyParser.json())

// 跨域設定
app.use(cors({
  origin (origin, callback) {
    // 如果是 Postman 之類的後端, 則允許
    if (origin === undefined) {
      callback(null, true)
    } else {
      if (process.env.DEV === 'true') {
        // 如果是本機開發接受所有請求
        callback(null, true)
      } else if (origin.includes('github')) {
        // 如果不是本機開發, 但從 github 過來的請求則允許
        callback(null, true)
      } else {
        // 如果不是本機開發, 也不是從 github 過來的請求則拒絕
        callback(new Error('Not allowed'), false)
      }
    }
  },
  credentials: true
}))

const MongoStore = connectMongo(session)

const sessionSettings = {
  // 密鑰
  secret: 'cuishare',
  // session 儲存位置 => 這裡設定為 MongoDB 資料庫
  store: new MongoStore({ mongooseConnection: mongoose.connection }),
  // 登入有效期限
  cookie: {
    maxAge: 1000 * 60 * 30
  },
  // 是否保存未被修改的 session
  saveUninitialized: false,
  // 是否每次請求重設登入有效期限
  rolling: true,
  resave: true
}

if (process.env.DEV === 'false') {
  // 如果不是本機的開發環境，允許不同網域的認證
  sessionSettings.cookie.sameSite = 'none'
  // 如果是不同網域的認證，一定要設定 secure
  sessionSettings.cookie.secure = true
}

app.use(session(sessionSettings))

// 部署上 Heroku 一定要設定, 不然後台在 Heroku 時會無法登入
app.set('trust proxy', 1)

// Router
app.use('/users', userRouter)

// 處理 bodyParser, cors 之類的 middleware 中間件發生錯誤時的處理
app.use((_, req, res, next) => {
  res.status(500).send({ success: false, message: '伺服器錯誤' })
})

app.listen(process.env.PORT, () => {
  console.log('http://localhost:' + process.env.PORT)
})