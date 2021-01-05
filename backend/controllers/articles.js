import articles from '../models/articles.js'
import users from '../models/users.js'
import validate from '../validators/articles.js'

// 創建文章
export const createArticle = async (req, res, next) => {
  try {
    const { error } = validate(req.body, ['title', 'content', 'isPublish'])
    if (error) return res.status(400).send({ success: false, message: `JoiError: ${error.message}` })

    if (!req.session.user) return res.status(401).send({ success: false, message: '未登入' })

    req.body.author_id = req.session.user._id
    const result = await articles.create(req.body)
    res.status(200).send({ success: true, message: '', result })
  } catch (error) {
    next(error)
  }
}

// 刪除文章
export const deleteArticle = async (req, res, next) => {
  try {
    if (!req.session.user) return res.status(401).send({ success: false, message: '未登入' })

    const article = await articles.findById(req.params.articleId)
    if (!article) return res.status(404).send({ success: false, message: '找不到文章' })
    if (!article.author_id.equals(req.session.user._id)) return res.status(403).send({ success: false, message: '沒有權限' })

    const result = await articles.findByIdAndDelete(req.params.articleId)
    res.status(200).send({ success: true, message: '刪除成功', result })
  } catch (error) {
    next(error)
  }
}

// 取得全部已發佈的文章
export const getArticleAll = async (req, res, next) => {
  try {
    const result = await articles.find({ isPublish: true })
      .populate('author_id', ['username', 'photo'])
      .sort('-createDate')
    if (result.length === 0) return res.status(404).send({ success: false, message: '找不到文章' })

    res.status(200).send({ success: true, message: '', result })
  } catch (error) {
    next(error)
  }
}

// 取得指定作者的所有已發佈的文章
export const getAuthorArticles = async (req, res, next) => {
  try {
    const result = await articles.find({
      author_id: req.params.authorId,
      isPublish: true
    }).populate('author_id', ['username', 'photo'])
      .sort('-createDate')

    if (result.length === 0) return res.status(404).send({ success: false, message: '找不到文章' })
    res.status(200).send({ success: true, message: '', result })
  } catch (error) {
    next(error)
  }
}

// 取得指定的已發佈文章
export const getArticle = async (req, res, next) => {
  try {
    const result = await articles.findOne({
      _id: req.params.articleId,
      isPublish: true
    }).populate('author_id', ['username', 'photo'])

    if (!result) return res.status(404).send({ success: false, message: '找不到文章' })
    res.status(200).send({ success: true, message: '', result })
  } catch (error) {
    next(error)
  }
}

// 更新編輯文章
export const editArticle = async (req, res, next) => {
  try {
    if (!req.session.user) return res.status(401).send({ success: false, message: '未登入' })

    const excludeKeys = ['author_id', 'createDate', 'likes', 'favorites']
    const keys = Object.keys(req.body)
    if (keys.some((value) => excludeKeys.includes(value))) return res.status(400).send({ success: false, message: '錯誤的更新' })

    const { error } = validate(req.body, keys)
    if (error) return res.status(400).send({ success: false, message: error.message })

    const article = await articles.findById(req.params.articleId)
    if (!article) return res.status(404).send({ success: false, message: '找不到文章' })
    if (!article.author_id.equals(req.session.user._id)) return res.status(403).send({ success: false, message: '沒有權限' })

    const result = await articles.findByIdAndUpdate(req.params.articleId,
      req.body,
      { new: true }
    ).select(keys)
    res.status(200).send({ success: true, message: '更改成功', result })
  } catch (error) {
    next(error)
  }
}

// 文章案讚更新
export const likeArticle = async (req, res, next) => {
  try {
    if (!req.session.user) return res.status(401).send({ success: false, message: '未登入' })

    const article = await articles.findById(req.params.articleId)
    if (!article) return res.status(404).send({ success: false, message: '找不到文章' })
    if (article.author_id.equals(req.session.user._id)) return res.status(403).send({ success: false, message: '沒有權限' })

    const isLiked = article.likes_userId.includes(req.session.user._id)
    if (!isLiked) {
      const result = await articles.findByIdAndUpdate(req.params.articleId, {
        $push: { likes_userId: req.session.user._id }
      }, { new: true })

      res.status(200).send({ success: true, message: '按讚', result })
    } else {
      const result = await articles.findByIdAndUpdate(req.params.articleId, {
        $pull: { likes_userId: req.session.user._id }
      }, { new: true })

      res.status(200).send({ success: true, message: '收回讚', result })
    }
  } catch (error) {
    next(error)
  }
}

// 文章收藏
export const favoriteArticle = async (req, res, next) => {
  try {
    if (!req.session.user) return res.status(401).send({ success: false, message: '未登入' })

    const article = await articles.findById(req.params.articleId)
    if (!article) return res.status(404).send({ success: false, message: '找不到文章' })
    if (article.author_id.equals(req.session.user._id)) return res.status(403).send({ success: false, message: '沒有權限' })

    const isFavorited = article.favorites_userId.includes(req.session.user._id)

    if (!isFavorited) {
      const result = await articles.findByIdAndUpdate(req.params.articleId, {
        $push: { favorites_userId: req.session.user._id }
      }, { new: true })

      await users.findByIdAndUpdate(req.session.user._id, {
        $push: { favorites_articleId: req.params.articleId }
      }, { new: true })

      res.status(200).send({ success: true, message: '收藏文章', result })
    } else {
      const result = await articles.findByIdAndUpdate(req.params.articleId, {
        $pull: { favorites_userId: req.session.user._id }
      }, { new: true })

      await users.findByIdAndUpdate(req.session.user._id, {
        $pull: { favorites_articleId: req.params.articleId }
      }, { new: true })

      res.status(200).send({ success: true, message: '取消收藏', result })
    }
  } catch (error) {
    next(error)
  }
}
