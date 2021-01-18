<template lang="pug">
#article
    b-container.editor-container
      #show-editor
      ArticleIcons(:article="article" :size="'lg'")

</template>

<script>
import ClassicEditor from '../ckeditor'
import ArticleIcons from '../components/ArticleIcons'

export default {
  name: 'Article',
  components: {
    ArticleIcons
  },
  data () {
    return {
      article: {}
    }
  },
  async mounted () {
    await this.getArticle()
    await this.initEditor()
    console.log(this.article)
  },
  methods: {
    async initEditor () {
      ClassicEditor
        .create(document.querySelector('#show-editor'), {
          toolbar: []
        })
        .then(editor => {
          editor.isReadOnly = true // 設定唯讀

          const content = this.article.text
          const viewFragment = editor.data.processor.toView(content)
          const modelFragment = editor.data.toModel(viewFragment)

          editor.model.insertContent(modelFragment)
        })
        .catch(error => {
          console.log(error)
        })
    },
    async getArticle () {
      try {
        const articleId = this.$route.params.id
        const res = await this.axios.get(process.env.VUE_APP_API + '/articles/' + articleId)
        const { success, result } = res.data

        if (success) this.article = result
      } catch (error) {
        alert(error.response.data.message)
      }
    }
  }
}
</script>
