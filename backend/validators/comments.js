import Joi from 'joi'

const validate = (credentials, requiredFields = []) => {
  // Schema
  let commentSchema = Joi.object({
    text: Joi.string().trim().max(1024).messages({
      'any.required': '請輸入留言內容',
      'string.empty': '請輸入留言內容',
      'string.max': '留言內容不能超過 1024 個字'
    })
  })

  commentSchema = commentSchema.fork(requiredFields, field => field.required())

  return commentSchema.validate(credentials)
}

export default validate
