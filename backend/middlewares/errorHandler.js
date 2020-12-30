const errorHandler = (error, req, res, next) => {
  console.log(error)

  if (error.name === 'ValidationError') {
    const key = Object.keys(error.errors)[0]
    const message = error.errors[key].message
    res.status(400).send({ success: false, message })
    return
  }

  if (error.name === 'MongoError' && error.code === 11000) {
    const key = Object.keys(error.keyValue)[0]
    res.status(400).send({ success: false, message: key + ' is unique' })
    return
  }

  res.status(500).send({ success: false, message: error })
}

export default errorHandler
