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

    res.status(200).send({ success: true, message: '註冊成功' })
  } catch (error) {
    next(error)
  }
}
// 註冊帳號時判斷 Email 是否被使用過
export const isEmailRepeat = async (req, res, next) => {
  try {
    const user = await users.findOne({ email: req.params.email }, 'email -_id')

    if (user) return res.status(400).send({ success: false, message: '' })
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
    // .populate('following', ['username', 'photoUrl', 'about', 'following'])
    // .populate('followers', ['username', 'photoUrl', 'about', 'followers'])

    if (!user) return res.status(400).send({ success: false, message: 'email 或密碼錯誤' })

    if (req.session.user && user.id === req.session.user._id) return res.status(401).send({ success: false, message: '登入中' })

    req.session.user = user
    res.status(200).send({ success: true, message: '登入成功', result: user })
  } catch (error) {
    next(error)
  }
}

// 使用者登出
export const logoutUser = async (req, res, next) => {
  try {
    // if (!req.session.user) return res.status(401).send({ success: false, message: '未登入' })

    req.session.destroy(error => {
      if (error) return res.status(500).send({ success: false, message: '登出失敗' })

      res.clearCookie()
      res.status(200).send({ success: true, message: '登出成功' })
    })
  } catch (error) {
    next(error)
  }
}

// 更新使用者資料
export const updateUserInfo = async (req, res, next) => {
  try {
    if (!req.session.user) return res.status(401).send({ success: false, message: '未登入' })
    console.log(req.body.photoUrl)
    // 禁止使用者更新不該更新的資料
    const excludeKeys = ['email', 'createDate', 'following', 'followers', 'articleCategory']
    const keys = Object.keys(req.body)
    if (keys.some((value) => excludeKeys.includes(value))) return res.status(400).send({ success: false, message: '無法更新使用者' })

    const { error } = validate(req.body, keys)
    if (error) return res.status(400).send({ success: false, message: error.message })

    const user = await users.findById(req.params.userId)
    if (!user) return res.status(404).send({ success: false, message: '找不到資料' })
    if (user.id !== req.session.user._id) return res.status(403).send({ success: false, message: '沒有權限' })

    // 更改密碼先驗證原密碼
    if (req.body.newPassword || req.body.password) {
      if (md5(req.body.password) !== user.password || !req.body.newPassword) return res.status(400).send({ success: false, message: '無法更新使用者' })

      req.body.password = md5(req.body.newPassword)
      delete req.body.newPassword
    }

    const result = await users.findByIdAndUpdate(
      req.params.userId,
      req.body,
      { new: true }
    ).select(keys)
    res.status(200).send({ success: true, message: '更改成功', result })
  } catch (error) {
    next(error)
  }
}

// 關注其他使用者
export const followUser = async (req, res, next) => {
  try {
    if (!req.session.user) return res.status(401).send({ success: false, message: '未登入' })

    const user = await users.findById(req.session.user._id)
    const followedUser = await users.findById(req.params.userId)
    if (!followedUser || !user) return res.status(404).send({ success: false, message: '找不到資料' })

    const isfollowing = user.following.includes(req.params.userId)

    if (!isfollowing) {
      // 對方的 followers $push 自己的 id
      await users.findByIdAndUpdate(req.params.userId,
        { $push: { followers: user._id } }
      )

      // 自己的 following $push 對方的 id
      const result = await users.findByIdAndUpdate(req.session.user._id,
        { $push: { following: followedUser._id } },
        { new: true }
      )
      // .populate('following', ['username', 'photoUrl', 'about', 'following', 'followers'])
      //   .select('following')

      return res.status(200).send({ success: true, message: '追蹤中', result })
    } else {
      await users.findByIdAndUpdate(req.params.userId,
        { $pull: { followers: user._id } }
      )

      const result = await users.findByIdAndUpdate(req.session.user._id,
        { $pull: { following: followedUser._id } },
        { new: true }
      )
      // .populate('following', ['username', 'photoUrl', 'about', 'following', 'followers'])
      //   .select('following')
      return res.status(200).send({ success: true, message: '取消追蹤', result })
    }
  } catch (error) {
    next(error)
  }
}

// 取得追蹤中的作者
export const getFollowingUser = async (req, res, next) => {
  try {
    if (!req.session.user) return res.status(401).send({ success: false, message: '未登入' })

    const user = await users.findById(req.session.user._id)
      .populate({
        path: 'following',
        model: 'users',
        select: 'username photoUrl about following followers',
        populate: {
          path: 'following followers',
          model: 'users',
          select: 'username photoUrl about'
        }
      })
      .populate({
        path: 'followers',
        model: 'users',
        select: 'username photoUrl about following followers',
        populate: {
          path: 'following followers',
          model: 'users',
          select: 'username photoUrl about'
        }
      })
      .select('following followers')

    if (user.id !== req.session.user._id) return res.status(403).send({ success: false, message: '沒有權限' })
    if (!user) return res.status(404).send({ success: false, message: '找不到資料' })

    return res.status(200).send({ success: true, result: user })
  } catch (error) {
    next(error)
  }
}

// 取得追蹤我的粉絲
export const getFollowersUser = async (req, res, next) => {
  try {
    if (!req.session.user) return res.status(401).send({ success: false, message: '未登入' })

    const user = await users.findById(req.session.user._id)
      .populate({
        path: 'followers',
        model: 'users',
        select: 'username photoUrl about following followers',
        populate: {
          path: 'following followers',
          model: 'users',
          select: 'username photoUrl about'
        }
      })
      .select('following')

    if (user.id !== req.session.user._id) return res.status(403).send({ success: false, message: '沒有權限' })
    if (!user) return res.status(404).send({ success: false, message: '找不到資料' })

    return res.status(200).send({ success: true, result: user })
  } catch (error) {
    next(error)
  }
}

// 增加使用者的文章類別
export const addArticleCategory = async (req, res, next) => {
  try {
    if (!req.session.user) return res.status(401).send({ success: false, message: '未登入' })

    const user = await users.findById(req.params.userId)
    if (!user) return res.status(404).send({ success: false, message: '找不到資料' })
    if (user.id !== req.session.user._id) return res.status(403).send({ success: false, message: '沒有權限' })

    for (const item of user.articleCategory) {
      if (item.categoryName === req.body.categoryName) {
        return res.status(400).send({ success: false, message: '已有此文章類別' })
      }
    }

    const result = await users.findByIdAndUpdate(req.params.userId,
      {
        $push: {
          articleCategory: {
            categoryName: req.body.categoryName
          }
        }
      },
      { new: true }
    )
    return res.status(200).send({ success: true, message: '新增文章類別', result })
  } catch (error) {
    next(error)
  }
}

// 刪除使用者的文章類別
export const removeArticleCategory = async (req, res, next) => {
  try {
    if (!req.session.user) return res.status(401).send({ success: false, message: '未登入' })

    const user = await users.findOne({ 'articleCategory._id': req.params.categoryId })
    if (!user) return res.status(404).send({ success: false, message: '找不到資料' })
    if (user.id !== req.session.user._id) return res.status(403).send({ success: false, message: '沒有權限' })

    // const categoryName = user.articleCategory.id(req.params.categoryId).categoryName
    // if (categoryName === 'All') return res.status(400).send({ success: false, message: '預設類別請勿刪除' })

    const result = await users.findOneAndUpdate(
      { 'articleCategory._id': req.params.categoryId },
      {
        $pull: {
          articleCategory: {
            _id: req.params.categoryId
          }
        }
      },
      { new: true }
    )
    return res.status(200).send({ success: true, message: '刪除文章類別', result })
  } catch (error) {
    next(error)
  }
}

// 更新使用者的文章類別
export const changeArticleCategoryName = async (req, res, next) => {
  try {
    if (!req.session.user) return res.status(401).send({ success: false, message: '未登入' })

    const user = await users.findOne({ 'articleCategory._id': req.params.categoryId })
    if (!user) return res.status(404).send({ success: false, message: '找不到資料' })
    if (user.id !== req.session.user._id) return res.status(403).send({ success: false, message: '沒有權限' })

    // const categoryName = user.articleCategory.id(req.params.categoryId).categoryName
    // if (categoryName === 'All') return res.status(400).send({ success: false, message: '預設類別請勿變更' })

    const result = await users.findOneAndUpdate(
      { 'articleCategory._id': req.params.categoryId },
      {
        $set: {
          'articleCategory.$.categoryName': req.body.categoryName
        }
      },
      { new: true }
    )
    return res.status(200).send({ success: true, message: '更新文章類別', result })
  } catch (error) {
    next(error)
  }
}

// 發出請求避免有效期限自動登出
export const heartbeat = async (req, res, next) => {
  try {
    const isLogin = !!req.session.user
    res.status(200).send({ success: isLogin })
  } catch (error) {
    next(error)
  }
}
