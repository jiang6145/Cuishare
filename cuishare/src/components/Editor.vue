<template lang="pug">
#editor
  #my-editor
  b-button(@click="saveArticle") save
</template>

<script>
import ClassicEditor from '../ckeditor'
export default {
  name: 'Editor',
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
        .create(document.querySelector('#my-editor'))
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
    async saveArticle () {
      const TitlePlugin = this.editor.plugins.get('Title')
      const articleTitle = TitlePlugin.getTitle()

      try {
        const data = {
          title: articleTitle,
          text: this.editorData,
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
