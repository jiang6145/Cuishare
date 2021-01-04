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

// 取得全部文章
export const getArticleAll = async (req, res, next) => {
  try {
    const result = await articles.find({ isPost: true }).populate('author_id', ['username', 'photo'])
    if (result.length === 0) return res.status(404).send({ success: false, message: '找不到資料' })

    res.status(200).send({ success: true, message: '', result })
  } catch (error) {
    next(error)
  }
}
