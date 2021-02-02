
import users from '../models/users.js'

// 取得通知
export const getNotifications = async (req, res, next) => {
  try {
    if (!req.session.user) return res.status(401).send({ success: false, message: '未登入' })

    const result = await users
      .findById(req.session.user._id, 'notifications')
      .sort('-createDate')

    res.status(200).send({ success: true, message: '', result })
  } catch (error) {
    next(error)
  }
}

// 傳送通知
export const sendNotifications = async (req, res, next) => {
  try {
    if (!req.session.user) return res.status(401).send({ success: false, message: '未登入' })

    const result = await users.updateMany(
      { _id: { $in: req.session.user.followers } },
      { $push: { notifications: req.body } }
    )
    res.status(200).send({ success: true, message: '', result })
  } catch (error) {
    next(error)
  }
}
