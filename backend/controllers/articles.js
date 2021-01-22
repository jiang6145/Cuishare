import articles from '../models/articles.js'
import validate from '../validators/articles.js'

// 創建文章
export const createArticle = async (req, res, next) => {
  try {
    if (!req.session.user) return res.status(401).send({ success: false, message: '未登入' })

    const { error } = validate(req.body)
    if (error) return res.status(400).send({ success: false, message: error.message })

    req.body.author = req.session.user._id

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

    const isAuthor = article.author.equals(req.session.user._id)
    const isAdmin = req.session.user.isAdmin
    if (!isAuthor && !isAdmin) return res.status(403).send({ success: false, message: '沒有權限' })

    const result = await articles.findByIdAndDelete(req.params.articleId)
    res.status(200).send({ success: true, message: '刪除文章', result })
  } catch (error) {
    next(error)
  }
}

// 更新編輯文章
export const editArticle = async (req, res, next) => {
  try {
    if (!req.session.user) return res.status(401).send({ success: false, message: '未登入' })

    const excludeKeys = ['author', 'createDate', 'likes', 'favorites', 'category']
    const keys = Object.keys(req.body)
    if (keys.some((value) => excludeKeys.includes(value))) return res.status(400).send({ success: false, message: '錯誤的更新' })

    const { error } = validate(req.body, keys)
    if (error) return res.status(400).send({ success: false, message: error.message })

    const article = await articles.findById(req.params.articleId)
    if (!article) return res.status(404).send({ success: false, message: '找不到文章' })
    if (!article.author.equals(req.session.user._id)) return res.status(403).send({ success: false, message: '沒有權限' })

    const result = await articles.findByIdAndUpdate(req.params.articleId,
      req.body,
      { new: true }
    ).populate('author', ['username', 'photoUrl'])
    res.status(200).send({ success: true, message: '更改成功', result })
  } catch (error) {
    next(error)
  }
}

// 更新文章類別
export const changeArticleCategory = async (req, res, next) => {
  try {
    if (!req.session.user) return res.status(401).send({ success: false, message: '未登入' })

    const article = await articles.findById(req.params.articleId)
    if (!article) return res.status(404).send({ success: false, message: '找不到文章' })
    if (!article.author.equals(req.session.user._id)) return res.status(403).send({ success: false, message: '沒有權限' })

    article.category = req.params.categoryId
    article.save()

    res.status(200).send({ success: true, message: '更改成功', article })
  } catch (error) {
    next(error)
  }
}

// 取得全部的文章
export const getArticleAll = async (req, res, next) => {
  // 管理者取得除了草稿的所有文章, 使用者取得已發佈的公開未被封鎖文章
  const isAdmin = req.session.user.isAdmin
  const query = isAdmin
    ? { isDraft: false }
    : { isPublish: true, isDraft: false, isBlocked: false, isUnlisted: false }

  try {
    const result = await articles
      .find(query)
      .populate('author', ['username', 'photoUrl'])
      .sort('-createDate')
    if (result.length === 0) return res.status(404).send({ success: false, message: '找不到文章' })

    res.status(200).send({ success: true, message: '', result })
  } catch (error) {
    next(error)
  }
}

// 取得指定作者的全部文章
export const getAuthorArticles = async (req, res, next) => {
  const isAuthor = req.session.user._id === req.params.authorId
  const isAdmin = req.session.user.isAdmin

  const query = isAuthor
    ? { author: req.params.authorId }
    : (isAdmin
        ? { author: req.params.authorId, isDraft: false }
        : { author: req.params.authorId, isPublish: true, isDraft: false, isBlocked: false, isUnlisted: false })

  try {
    const result = await articles.find(query)
      .populate('author', ['username', 'photoUrl'])
      .sort('-createDate')

    if (result.length === 0) return res.status(404).send({ success: false, message: '找不到文章' })
    res.status(200).send({ success: true, message: '', result })
  } catch (error) {
    next(error)
  }
}

// 取得指定文章
export const getArticle = async (req, res, next) => {
  try {
    const { author } = await articles.findById(req.params.articleId, 'author -_id')
    const isAuthor = author.equals(req.session.user._id)
    const isAdmin = req.session.user.isAdmin

    const query = isAuthor
      ? { _id: req.params.articleId }
      : (isAdmin
          ? { _id: req.params.articleId, isDraft: false }
          : { _id: req.params.articleId, isPublish: true, isDraft: false, isBlocked: false, isUnlisted: false })

    const result = await articles.findOne(query)
      .populate('author', ['username', 'photoUrl'])

    if (!result) return res.status(404).send({ success: false, message: '找不到文章' })
    res.status(200).send({ success: true, message: '', result })
  } catch (error) {
    next(error)
  }
}

// 文章案讚更新
export const likeArticle = async (req, res, next) => {
  try {
    if (!req.session.user) return res.status(401).send({ success: false, message: '未登入' })

    const article = await articles.findOne({
      _id: req.params.articleId,
      isPublish: true
    })
    if (!article) return res.status(404).send({ success: false, message: '找不到文章' })

    const isLiked = article.likes.includes(req.session.user._id)
    if (!isLiked) {
      const result = await articles.findByIdAndUpdate(req.params.articleId,
        { $push: { likes: req.session.user._id } },
        { new: true }
      )

      res.status(200).send({ success: true, message: '點讚', result })
    } else {
      const result = await articles.findByIdAndUpdate(req.params.articleId,
        { $pull: { likes: req.session.user._id } },
        { new: true }
      )

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

    const article = await articles.findOne({
      _id: req.params.articleId,
      isPublish: true
    })
    if (!article) return res.status(404).send({ success: false, message: '找不到文章' })

    const isFavorited = article.favorites.includes(req.session.user._id)
    if (!isFavorited) {
      const result = await articles.findByIdAndUpdate(req.params.articleId,
        { $push: { favorites: req.session.user._id } },
        { new: true }
      )

      res.status(200).send({ success: true, message: '收藏文章', result })
    } else {
      const result = await articles.findByIdAndUpdate(req.params.articleId,
        { $pull: { favorites: req.session.user._id } },
        { new: true }
      )

      res.status(200).send({ success: true, message: '取消收藏', result })
    }
  } catch (error) {
    next(error)
  }
}
