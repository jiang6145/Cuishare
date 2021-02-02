import multer from 'multer'
import axios from 'axios'
import path from 'path'
import fs from 'fs'

import { fileStorage, uploadHandler } from '../middlewares/fileStorage.js'

// 上傳文章圖片
export const imageUpload = async (req, res, next) => {
  try {
    if (!req.session.user) return res.status(401).send({ success: false, message: '未登入' })

    const storage = fileStorage()
    const upload = uploadHandler(storage)

    upload.single('image')(req, res, async (error) => {
      if (error instanceof multer.MulterError) {
        let message = ''
        if (error.code === 'LIMIT_FILE_SIZE') {
          message = '檔案限制最大 1MB'
        } else if (error.code === 'LIMIT_FORMAT') {
          message = '格式錯誤'
        } else {
          message = '上傳錯誤'
        }

        return res.status(400).send({ success: false, message })
      }

      let filename = ''
      if (process.env.DEV === 'true') {
        filename = req.file.filename
      } else {
        filename = path.basename(req.file.path)
      }

      return res.status(200).send({ success: true, message: '', filename })
    })
  } catch (error) {
    next(error)
  }
}

export const getImage = async (req, res, next) => {
  // 開發環境回傳本機圖片
  if (process.env.DEV === 'true') {
    // 尋找圖片
    const path = process.cwd() + '/images/' + req.params.filename
    const exists = fs.existsSync(path)

    if (exists) {
      res.status(200).sendFile(path)
    } else {
      res.status(404).send({ success: false, message: '找不到圖片' })
    }
  } else {
    axios({
      url: 'http://' + process.env.FTP_HOST + '/' + process.env.FTP_USER + '/' + req.params.filename,
      method: 'get',
      responseType: 'stream'
    }).then(response => {
      response.data.pipe(res)
    }).catch(error => {
      res.status(error.response.status).send({ success: false, message: '取得圖片失敗' })
    })
  }
}

// 刪除圖片
export const deleteImage = async (req, res, next) => {
  try {
    if (!req.session.user) return res.status(401).send({ success: false, message: '未登入' })

    if (process.env.DEV === 'true') {
      const path = process.cwd() + '/images/' + req.params.filename
      const exists = fs.existsSync(path)

      if (!exists) return res.status(404).send({ success: false, message: '找不到圖片' })

      fs.unlink('images/' + req.params.filename, () => {})
      res.status(200).send({ success: true, message: '' })
    }
  } catch (error) {
    next(error)
  }
}
