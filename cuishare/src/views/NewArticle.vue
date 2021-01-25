<template lang="pug">
.article.article--editor-new
  b-container
    b-row
      b-col.mx-auto(cols="12" lg="10")
        #editor-new
    //- b-button save
</template>

<script>
import ClassicEditor from '../ckeditor'
import UploadAdapter from '../uploadAdapter'

export default {
  name: 'NewArticle',
  data () {
    return {
      editor: null,
      editorData: ''
    }
  },
  computed: {
  },
  mounted () {
    this.initEditor()
  },
  methods: {
    initEditor () {
      const autoSave = this.autoSave

      // 創建 CkEditor
      ClassicEditor
        .create(document.querySelector('#editor-new'), {
          // 插入自定義 UploadAdapter
          extraPlugins: [this.UploadAdapterPlugin],
          imageRemoveEvent: {
            // 刪除後端的圖片檔案
            callback: async (imagesSrc, nodeObjects) => {
              try {
                await this.axios.delete(imagesSrc)
              } catch (error) {
                console.log(error.response.data.message)
              }
            }
          },
          autosave: {
            waitingTime: 2000,
            save (editor) {
              return autoSave(editor.getData())
            }
          }
        })
        .then(editor => {
          // 創建成功執行
          this.editor = editor
          this.editorData = editor.getData()

          editor.model.document.on('change:data', () => {
            this.editor = editor
            this.editorData = editor.getData()
          })
        })
        .catch(error => {
          console.log(error)
        })
    },
    UploadAdapterPlugin (editor) {
      // 創建 UploadAdapter
      editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
        return new UploadAdapter(loader)
      }
    },
    autoSave (data) {
      return new Promise((resolve, reject) => {
        if (data) {
          const articleData = this.dataHandler(data)
          this.axios.post(process.env.VUE_APP_API + '/articles', articleData)
            .then(res => {
              const articleId = res.data.result._id
              this.$router.push('/article-edit/' + articleId)
            })
        }
        console.log('saved')
        resolve()
      })
    },
    dataHandler (data) {
      // 取得標題
      const TitlePlugin = this.editor.plugins.get('Title')
      const title = TitlePlugin.getTitle()

      // 取得第一個有內容的 <p>
      const paragraphs = document.querySelectorAll('.ck-content p')
      let subTitle = ''
      for (const paragraph of paragraphs) {
        if (paragraph.innerText.trim() !== '') {
          subTitle = paragraph.innerText.trim()
          break
        }
      }

      const image = document.querySelector('.ck-content img')
      const coverPhotoUrl = image ? image.getAttribute('src') : ''

      return {
        title,
        subTitle,
        coverPhotoUrl,
        text: data
      }
    }
  }
}
</script>
