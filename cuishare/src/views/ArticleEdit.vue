<template lang="pug">
  .article.article--editor-edit
    b-container
      b-row
        b-col.mx-auto(cols="12" lg="10")
          #editor-edit

    ArticlePublishModal(:editor="editor" :article="article")
</template>

<script>
// import * as readingTime from 'reading-time'
import ClassicEditor from '../ckeditor'
import UploadAdapter from '../uploadAdapter'
import ArticlePublishModal from '../components/ArticlePublishModal'

export default {
  name: 'ArticleEdit',
  components: {
    ArticlePublishModal
  },
  data () {
    return {
      editor: null,
      article: {}
    }
  },
  methods: {
    initEditor () {
      const autoSave = this.autoSave
      ClassicEditor
        .create(document.querySelector('#editor-edit'), {
          // 文章圖片上傳功能
          extraPlugins: [this.UploadAdapterPlugin],
          imageRemoveEvent: {
            // 前端刪除文章圖片時,同時刪除後端的圖片檔案
            callback: async (imagesSrc, nodeObjects) => {
              try {
                await this.axios.delete(imagesSrc)
              } catch (error) {
                console.log(error)
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
          this.getArticle().then(() => {
            // Ckeditor創建成功時, 將原有內容寫入
            if (!this.article.text) return
            const viewFragment = editor.data.processor.toView(this.article.text)
            const modelFragment = editor.data.toModel(viewFragment)
            editor.model.insertContent(modelFragment)
          })

          this.editor = editor
          this.article.text = editor.getData()
          this.displayStatus(editor)

          editor.model.document.on('change:data', () => {
            const TitlePlugin = this.editor.plugins.get('Title')
            const title = TitlePlugin.getTitle()

            this.editor = editor
            this.article.title = title
            this.article.text = editor.getData()
          })
        })
        .catch(error => {
          console.log(error.stack)
        })
    },
    UploadAdapterPlugin (editor) {
      // 文章上傳圖片
      editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
        return new UploadAdapter(loader)
      }
    },
    autoSave () {
      return new Promise((resolve, reject) => {
        // 編輯文章自動將內容保存到後端
        const data = {
          title: this.article.title,
          text: this.article.text
        }
        this.axios.patch(process.env.VUE_APP_API + '/articles/' + this.article._id, data)
          .catch(error => {
            console.log(error)
          })

        this.$store.commit('currentEditArticle', this.article)

        console.log('saved')
        resolve()
      })
    },
    displayStatus (editor) {
      const pendingActions = editor.plugins.get('PendingActions')
      const statusIndicator = document.querySelector('#snippet-autosave-status')

      pendingActions.on('change:hasAny', (evt, propertyName, newValue) => {
        if (newValue) {
          statusIndicator.classList.add('busy')
        } else {
          statusIndicator.classList.remove('busy')
        }
      })
    },
    async getArticle () {
      try {
        const articleId = this.$route.params.id
        const res = await this.axios.get(process.env.VUE_APP_API + '/articles/' + articleId)
        const { success, result } = res.data

        if (success) {
          this.article = {
            _id: result._id,
            title: result.title,
            text: result.text,
            coverPhotoUrl: result.coverPhotoUrl,
            tags: result.tags,
            isDraft: result.isDraft,
            isPublished: result.isPublished,
            isUnlisted: result.isUnlisted
          }
        }
      } catch (error) {
        console.log(error)
      }
    }
  },
  mounted () {
    this.initEditor()
  }
}
</script>
