import axios from 'axios'

const saveData = (data, id) => {
  return new Promise(resolve => {
    console.log('Saved', data)
    axios.patch(process.env.VUE_APP_API + '/articles/' + id, { text: data })
      .then(res => {
        const { success, result } = res.data
        console.log(success, result)
      }).catch(error => {
        console.log(error)
      })

    resolve()
  })
}

export default saveData
