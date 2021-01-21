import multer from 'multer'
import FTPStorage from 'multer-ftp'
import path from 'path'

// 本機開發, 檔案存電腦
// 雲端環境, 檔案存 FTP
export const userFileStorage = (userId) => {
  let storage = null

  if (process.env.DEV === 'true') {
    storage = multer.diskStorage({
      destination (req, file, callback) {
        callback(null, 'images/')
      },
      filename (req, file, callback) {
        callback(null, userId + path.extname(file.originalname))
      }
    })
  } else {
    storage = new FTPStorage({
      // FTP 登入設定
      ftp: {
        host: process.env.FTP_HOST,
        user: process.env.FTP_USER,
        password: process.env.FTP_PASSWORD,
        secure: false
      },
      // 上傳的路徑含檔名
      // 路徑為 FTP 的絕對路徑
      destination (req, file, options, callback) {
        callback(null, '/' + userId + path.extname(file.originalname))
      }
    })
  }

  return storage
}

export const articleFileStorage = () => {
  let storage = null

  if (process.env.DEV === 'true') {
    storage = multer.diskStorage({
      destination (req, file, callback) {
        callback(null, 'images/')
      },
      filename (req, file, callback) {
        callback(null, Date.now() + path.extname(file.originalname))
      }
    })
  } else {
    storage = new FTPStorage({
      // FTP 登入設定
      ftp: {
        host: process.env.FTP_HOST,
        user: process.env.FTP_USER,
        password: process.env.FTP_PASSWORD,
        secure: false
      },
      // 上傳的路徑含檔名
      // 路徑為 FTP 的絕對路徑
      destination (req, file, options, callback) {
        callback(null, '/' + Date.now() + path.extname(file.originalname))
      }
    })
  }

  return storage
}

export const uploadHandler = (storage) => {
  return multer({
    storage,
    fileFilter (req, file, callback) {
      if (!file.mimetype.includes('image')) {
        callback(new multer.MulterError('LIMIT_FORMAT'), false)
      } else {
        callback(null, true)
      }
    },
    limits: {
      fileSize: 1024 * 1024
    }
  })
}
