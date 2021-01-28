import * as timeDifference from 'time-difference-js'

const dateFormat = (date) => {
  const now = new Date(date)

  let year = now.getFullYear()// 年
  if (year < 1900) year = year + 1900

  let month = now.getMonth() + 1// 月
  if (month < 10) month = '0' + month

  let day = now.getDate()// 日
  if (day < 10) day = '0' + day

  return year + '/' + month + '/' + day
}

const dateDifference = (date) => {
  const { getTimeDiff } = timeDifference
  const startDate = new Date(date)
  const endDate = new Date()

  const result = getTimeDiff(startDate, endDate)
  const { value, suffix } = result

  switch (suffix) {
    case 'second':
    case 'seconds':
      result.text = value + ' 秒前'
      break
    case 'minute':
    case 'minutes':
      result.text = value + ' 分鐘前'
      break
    case 'hours':
      result.text = value + ' 小時前'
      break
    case 'days':
      result.text = value + ' 天前'
      break
    case 'weeks':
      result.text = value + ' 星期前'
      break
    case 'months':
      result.text = value + ' 月前'
      break
    case 'year':
      result.text = value + ' 年前'
      break
    case 'years':
      result.text = dateFormat(date)
      break
  }

  return result.text
}

export default dateDifference
