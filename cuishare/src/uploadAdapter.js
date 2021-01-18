import axios from 'axios'

export default class UploadAdapter {
  constructor (loader) {
    // The file loader instance to use during the upload.
    this.loader = loader
  }

  upload () {
    return this.loader.file.then(uploadFile => {
      return new Promise((resolve, reject) => {
        const data = new FormData()
        data.append('image', uploadFile)

        axios({
          url: process.env.VUE_APP_API + '/articles/image',
          method: 'post',
          data,
          headers: {
            'Content-Type': 'multipart/form-data;'
          },
          withCredentials: true
        }).then(res => {
          if (res.data.success) {
            resolve({
              default: process.env.VUE_APP_API + '/articles/image/' + res.data.file
            })
          } else {
            reject(res.data.message)
          }
        }).catch(error => {
          console.log(error)
          reject(error.response.data.message)
        })
      })
    })
  }
}
