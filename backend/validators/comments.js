import Joi from 'joi'

const validate = (credentials, requiredFields = []) => {
  // Schema
  let userSchema = Joi.object({
    content: Joi.string().trim().max(1024)
      .messages({
        'any.required': '請輸入留言內容',
        'string.empty': '請輸入留言內容',
        'string.max': '留言內容不能超過 1024 個字'
      })
  })

  userSchema = userSchema.fork(requiredFields, field => field.required())

  return userSchema.validate(credentials)
}

export default validate
