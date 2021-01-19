<template lang="pug">
#article
    b-container.editor-container
      #show-editor
      .article-footer
        ArticleIcons(v-if="article" :article="article" :size="'lg'")
        FollowButton(v-if="article" :author="article.author")
</template>

<script>
import ClassicEditor from '../ckeditor'
import ArticleIcons from '../components/ArticleIcons'
import FollowButton from '../components/FollowButton'

export default {
  name: 'Article',
  components: {
    ArticleIcons,
    FollowButton
  },
  data () {
    return {
      article: null
    }
  },
  async mounted () {
    await this.getArticle()
    this.initEditor()
  },
  methods: {
    initEditor () {
      ClassicEditor
        .create(document.querySelector('#show-editor'), {
          toolbar: []
        })
        .then(editor => {
          editor.isReadOnly = true // 設定唯讀

          // 寫入內容
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
