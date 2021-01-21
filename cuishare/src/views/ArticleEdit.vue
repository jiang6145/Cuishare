<template lang="pug">
#article-edit
  b-container.editor-container
    #my-editor
    b-button(@click="publish") 發佈文章
</template>

<script>
import ClassicEditor from '../ckeditor'
import UploadAdapter from '../uploadAdapter'

export default {
  name: 'ArticleEdit',
  data () {
    return {
      editor: null,
      editorData: ''
    }
  },
  computed: {
    editorStorage () {
      return this.$store.state.editorStorage
    }
  },
  mounted () {
    this.initEditor()
  },
  methods: {
    initEditor () {
      const autoSave = this.autoSave

      // 創建 CkEditor
      ClassicEditor
        .create(document.querySelector('#my-editor'), {
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
            waitingTime: 5000,
            save (editor) {
              return autoSave(editor.getData())
            }
          }
        })
        .then(editor => {
          this.getArticle().then(res => {
            // 如果當前編輯的文章ID 與之前的不一樣, commit editorStorage 資料
            if (this.editorStorage.id !== res._id) this.$store.commit('editorStorage', res)

            // 如果一樣, 取得 editorStorage 資料往編輯器寫入內容
            const viewFragment = editor.data.processor.toView(this.editorStorage.text)
            const modelFragment = editor.data.toModel(viewFragment)
            editor.model.insertContent(modelFragment)
          })

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
        // 編輯文章先把當前內容保存到 editorStorage
        this.$store.commit('editorStorage', { text: data, _id: this.$route.params.id })

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
    },
    async getArticle () {
      try {
        const articleId = this.$route.params.id
        const res = await this.axios.get(process.env.VUE_APP_API + '/articles/' + articleId)
        return res.data.result
      } catch (error) {
        console.log(error)
      }
    },
    async save () {
      try {
        const articleId = this.$route.params.id
        const articleData = this.dataHandler(this.editorData)
        const res = await this.axios.patch(process.env.VUE_APP_API + '/articles/' + articleId, articleData)

        if (res.data.success) {
          this.$store.commit('editorStorage', { text: '', _id: '' })
          // this.$router.push('/') 保存成功前往文章閱讀頁面
        }
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>
