import comments from '../models/comments.js'
import articles from '../models/articles.js'
import validate from '../validators/comments.js'

// 在指定文章中新增留言
export const cerateComment = async (req, res, next) => {
  try {
    if (!req.session.user) return res.status(401).send({ success: false, message: '未登入' })

    const { error } = validate(req.body, ['text'])
    if (error) return res.status(400).send({ success: false, message: error.message })

    const article = articles.findById(req.params.articleId)
    if (!article) return res.status(404).send({ success: false, message: '找不到文章' })

    req.body.byUser = req.session.user._id
    req.body.byArticle = req.params.articleId

    let result = await comments.create(req.body)
    result = await result
      .populate('byUser', ['username', 'photoUrl'])
      .populate('byArticle')
      .execPopulate()

    res.status(200).send({ success: true, message: '留言', result })
  } catch (error) {
    next(error)
  }
}

// 刪除留言
export const deleteComment = async (req, res, next) => {
  try {
    if (!req.session.user) return res.status(401).send({ success: false, message: '未登入' })

    const comment = await comments.findById(req.params.commentId).populate('byArticle', 'author')

    console.log(comment.byArticle.author.equals(req.session.user._id))
    if (!comment) return res.status(404).send({ success: false, message: '找不到留言' })

    const isCommentUser = comment.byUser.equals(req.session.user._id)
    const isArticleAuthor = comment.byArticle.author.equals(req.session.user._id)
    if (!isCommentUser && !isArticleAuthor) return res.status(403).send({ success: false, message: '沒有權限' })

    const result = await comments.findByIdAndDelete(req.params.commentId)
    res.status(200).send({ success: true, message: '刪除留言', result })
  } catch (error) {
    next(error)
  }
}

// 取得指定文章的所有留言
export const getComments = async (req, res, next) => {
  try {
    const result = await comments.find({ byArticle: req.params.articleId })
      .populate('byUser', ['username', 'photoUrl'])
      .populate('likes', ['username', 'photoUrl'])
      .sort('-createDate')

    if (result.length === 0) return res.status(404).send({ success: false, message: '找不到留言' })

    res.status(200).send({ success: true, message: '', result })
  } catch (error) {
    next(error)
  }
}

// 對指定留言點讚
export const likeComment = async (req, res, next) => {
  try {
    if (!req.session.user) return res.status(401).send({ success: false, message: '未登入' })

    const comment = await comments.findById(req.params.commentId)
    if (!comment) return res.status(404).send({ success: false, message: '找不到留言' })

    console.log(comment)
    const isLiked = comment.likes.includes(req.session.user._id)
    if (!isLiked) {
      const result = await comments.findByIdAndUpdate(req.params.commentId,
        { $push: { likes: req.session.user._id } },
        { new: true }
      )

      res.status(200).send({ success: true, message: '點讚', result })
    } else {
      const result = await comments.findByIdAndUpdate(req.params.commentId,
        { $pull: { likes: req.session.user._id } },
        { new: true }
      )

      res.status(200).send({ success: true, message: '收回讚', result })
    }
  } catch (error) {
    next(error)
  }
}

// 回覆留言的訊息
export const addReply = async (req, res, next) => {
  try {
    if (!req.session.user) return res.status(401).send({ success: false, message: '未登入' })

    const { error } = validate(req.body, ['text'])
    if (error) return res.status(400).send({ success: false, message: error.message })

    const comment = comments.findById(req.params.commentId)
    if (!comment) return res.status(404).send({ success: false, message: '找不到留言' })

    const result = await comments.findByIdAndUpdate(req.params.commentId,
      {
        $push: {
          replies: {
            text: req.body.text,
            byUser: req.session.user._id
          }
        }
      },
      { new: true }
    )

    res.status(200).send({ success: true, message: '回覆留言', result })
  } catch (error) {
    next(error)
  }
}

// 刪除留言的回覆
export const removeReply = async (req, res, next) => {
  try {
    if (!req.session.user) return res.status(401).send({ success: false, message: '未登入' })

    const comment = await comments.findOne({ 'replies._id': req.params.replyId }).select('replies')
    console.log(comment)
    if (!comment) return res.status(404).send({ success: false, message: '找不到留言' })

    const isCommentUser = comment.byUser.equals(req.session.user._id)
    const isArticleAuthor = comment.byArticle._id.equals(req.session.user._id)
    if (!isCommentUser && !isArticleAuthor) return res.status(403).send({ success: false, message: '沒有權限' })
  } catch (error) {
    next(error)
  }
}
