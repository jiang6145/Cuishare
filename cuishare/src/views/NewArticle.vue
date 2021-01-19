<template lang="pug">
#new-article
  b-container.editor-container
    #my-editor
    b-button(@click="saveArticle") save
</template>

<script>
import ClassicEditor from '../ckeditor'
import UploadAdapter from '../uploadAdapter'

export default {
  name: 'NewArticle',
  data () {
    return {
      editor: null,
      editorData: null
    }
  },
  computed: {
    user () {
      return this.$store.state.user
    }
  },
  mounted () {
    this.initEditor()
  },
  methods: {
    initEditor () {
      ClassicEditor
        .create(document.querySelector('#my-editor'), {
          extraPlugins: [this.UploadAdapterPlugin],
          imageRemoveEvent: {
            callback: async (imagesSrc, nodeObjects) => {
              // 刪除後端的圖片檔案
              try {
                const res = await this.axios.delete(imagesSrc)
                if (!res.data.success) alert(res.data.message)
              } catch (error) {
                alert(error.response.data.message)
              }
            }
          }
        })
        .then(editor => {
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
      editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
        return new UploadAdapter(loader)
      }
    },
    async saveArticle () {
      const TitlePlugin = this.editor.plugins.get('Title')
      const articleTitle = TitlePlugin.getTitle()

      // 取得編輯器內的全部 <img>
      // const articleImages = document.querySelectorAll('.ck.ck-content img')
      // const imagesSrc = [...articleImages].map(image => image.getAttribute('src'))

      let descriptiont = ''
      const paragraphs = document.querySelectorAll('.ck.ck-content p')
      for (const p of paragraphs) {
        if (p.innerText.length > 10) descriptiont = p.innerText
      }

      let imageSrc = document.querySelector('.ck.ck-content img')
      imageSrc = imageSrc ? imageSrc.getAttribute('src') : ''

      try {
        const data = {
          title: articleTitle,
          description: descriptiont,
          text: this.editorData,
          coverPhotoUrl: imageSrc,
          isPublish: true
        }
        const res = await this.axios.post(process.env.VUE_APP_API + '/articles', data)
        alert(res.data.message)
        // if (this.$route.path !== '/') this.$router.push('/')
      } catch (error) {
        alert(error.response.data.message)
      }
    }
  }
}
</script>
