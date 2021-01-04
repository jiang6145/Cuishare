// import Joi from 'joi'
import Joi from 'joi-oid'

const validate = (credentials, requiredFields = []) => {
  // Schema
  let articleSchema = Joi.object({
    title: Joi.string().trim().max(50)
      .messages({
        'any.required': '請輸入文章標題',
        'string.empty': '請輸入文章標題',
        'string.max': '文章標題不能超過 50 個字'
      }),
    content: Joi.string(),
    // author: Joi.objectId(),
    date: Joi.date(),
    isPost: Joi.boolean(),
    like: Joi.number().min(0),
    favorite: Joi.number().min(0),
    tags: Joi.array().items(Joi.string())
  })

  // 設定 required 選項
  articleSchema = articleSchema.fork(requiredFields, field => field.required())

  return articleSchema.validate(credentials)
}

export default validate
