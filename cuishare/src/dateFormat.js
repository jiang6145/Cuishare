const dateFormat = (date) => {
  const now = new Date(date)

  let year = now.getFullYear()// 年
  if (year < 1900) year = year + 1900

  let month = now.getMonth() + 1// 月
  if (month < 10) month = '0' + month

  let day = now.getDate()// 日
  if (day < 10) day = '0' + day

  let hour = now.getHours()// 小時
  if (hour < 10) hour = '0' + hour

  let minute = now.getMinutes()// 分鐘
  if (minute < 10) minute = '0' + minute

  return year + '/' + month + '/' + day + ' ' + hour + ':' + minute
}

export default dateFormat
