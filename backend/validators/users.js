import Joi from 'joi'

const validate = (credentials, requiredFields = []) => {
  // Schema
  let userSchema = Joi.object({
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
      .messages({
        'any.required': '請輸入 email',
        'string.empty': '請輸入 email',
        'string.email': '請輸入正確的 email'
      }),
    password: Joi.string().pattern(/^[a-zA-Z0-9]{6,50}$/)
      .messages({
        'any.required': '請輸入密碼',
        'string.empty': '請輸入密碼',
        'string.pattern.base': '合法密碼僅包含數字、英文、最少需要6個字'
      }),
    newPassword: Joi.string().pattern(/^[a-zA-Z0-9]{6,50}$/)
      .messages({
        'any.required': '請輸入新密碼',
        'string.empty': '請輸入新密碼',
        'string.pattern.base': '合法密碼僅包含數字、英文、最少需要6個字'
      }),
    username: Joi.string().trim().min(4).max(30)
      .messages({
        'any.required': '請輸入名稱',
        'string.empty': '請輸入名稱',
        'string.min': '名稱最少需要 4 個字',
        'string.max': '名稱不能超過 30 個字'
      }),
    about: Joi.string().trim().allow('').allow(null).max(255)
      .messages({
        'string.max': '關於不能超過 255 個字'
      })
  })

  // 設定 required 選項
  userSchema = userSchema.fork(requiredFields, field => field.required())

  return userSchema.validate(credentials)
}

export default validate
