import Joi from 'joi'

const validate = (credentials, requiredFields = []) => {
  // Schema
  let articleSchema = Joi.object({
    title: Joi.string().trim().max(50).allow('').messages({
      'any.required': '請輸入文章標題',
      'string.empty': '請輸入文章標題',
      'string.max': '文章標題不能超過 50 個字'
    }),
    subTitle: Joi.string().allow(''),
    text: Joi.string().allow(''),
    coverPhotoUrl: Joi.string().allow(''),
    createDate: Joi.date(),
    isPublish: Joi.boolean(),
    isUnlisted: Joi.boolean(),
    isDraft: Joi.boolean(),
    isBlocked: Joi.boolean(),
    tags: Joi.array().items(Joi.string())
  })

  // 設定 required 選項
  articleSchema = articleSchema.fork(requiredFields, field => field.required())

  return articleSchema.validate(credentials)
}

export default validate
