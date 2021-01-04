import articles from '../models/articles.js'
import validate from '../validators/articles.js'

// 創建文章
export const createArticle = async (req, res, next) => {
  try {
    const { error } = validate(req.body, ['title', 'content', 'isPost'])
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
    const result = await articles.find({ isPost: true }).populate('author_id', ['username', 'photo'])
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
      isPost: true
    }).populate('author_id', ['username', 'photo'])

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
      isPost: true
    }).populate('author_id', ['username', 'photo'])

    if (!result) return res.status(404).send({ success: false, message: '找不到文章' })
    res.status(200).send({ success: true, message: '', result })
  } catch (error) {
    next(error)
  }
}
