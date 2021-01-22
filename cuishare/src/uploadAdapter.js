import axios from 'axios'
export default class UploadAdapter {
  constructor (loader) {
    this.loader = loader
  }

  upload () {
    return this.loader.file.then(uploadFile => {
      return new Promise((resolve, reject) => {
        console.log(uploadFile)
        const formData = new FormData()
        formData.append('image', uploadFile)
        console.log(formData)

        axios.post(process.env.VUE_APP_API + '/pictures', formData).then(res => {
          if (res.data.success) {
            resolve({
              default: process.env.VUE_APP_API + '/pictures/' + res.data.filename
            })
          } else {
            reject(res.data.message)
          }
        }).catch(error => {
          reject(error.response.data.message)
        })
      })
    })
  }
}
