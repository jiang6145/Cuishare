import comments from '../models/comments.js'
import articles from '../models/articles.js'
import validate from '../validators/comments.js'

// 指定文章新增留言
export const cerateComment = async (req, res, next) => {
  try {
    const { error } = validate(req.body, ['content'])
    if (error) return res.status(400).send({ success: false, message: error.message })

    if (!req.session.user) return res.status(401).send({ success: false, message: '未登入' })

    req.body.user_id = req.session.user._id
    req.body.article_id = req.params.articleId

    const result = await comments.create(req.body)
    await articles.findByIdAndUpdate(req.params.articleId, {
      $push: { comments_id: result._id }
    }, { new: true })

    res.status(200).send({ success: true, message: '留言', result })
  } catch (error) {
    next(error)
  }
}

// 刪除留言
export const deleteComment = async (req, res, next) => {
  try {
    if (!req.session.user) return res.status(401).send({ success: false, message: '未登入' })

    const comment = await comments.findById(req.params.commentId)
    if (!comment) return res.status(404).send({ success: false, message: '找不到留言' })

    const article = await articles.findById(comment.article_id)
    if (!article.author_id.equals(req.session.user._id) && !comment.user_id.equals(req.session.user._id)) {
      return res.status(403).send({ success: false, message: '沒有權限' })
    }

    const result = await comments.findByIdAndDelete(req.params.commentId)
    console.log(result._id)
    await articles.findByIdAndUpdate(comment.article_id, {
      $pull: { comments_id: result._id }
    }, { new: true })

    res.status(200).send({ success: true, message: '刪除成功', result })
  } catch (error) {
    next(error)
  }
}

// 取得指定文章的所有留言
export const getComments = async (req, res, next) => {
  try {
    const result = await comments.find({ article_id: req.params.articleId })
      .populate('user_id', ['username', 'photo'])
      .sort('-createDate')

    if (result.length === 0) return res.status(404).send({ success: false, message: '找不到留言' })

    res.status(200).send({ success: true, message: '', result })
  } catch (error) {
    next(error)
  }
}
