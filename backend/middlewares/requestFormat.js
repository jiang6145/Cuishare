const requestFormat = (req, res, next) => {
  if (!req.headers['content-type'] || !req.headers['content-type'].includes('application/json')) {
    res.status(400).send({ success: false, message: '資料格式不符合' })
    return
  }

  next()
}

export default requestFormat
