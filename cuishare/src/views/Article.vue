<template lang="pug">
#article
  b-container.editor-container
    #show-editor
    .article-footer
      ArticleIcons(v-if="article" :article="article" :size="'lg'")
      FollowButton(v-if="article" :author="article.author")
      br
      b-button(
        v-b-toggle.comment-sidebar
        size="sm"
      ) 留言

  CommentSidebar(v-if="article" :articleId="article._id")
</template>

<script>
import ClassicEditor from '../ckeditor'
import ArticleIcons from '../components/ArticleIcons'
import FollowButton from '../components/FollowButton'
import CommentSidebar from '../components/CommentSidebar'

export default {
  name: 'Article',
  components: {
    ArticleIcons,
    FollowButton,
    CommentSidebar
  },
  data () {
    return {
      article: null
    }
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
    }
  },
  async mounted () {
    try {
      const articleId = this.$route.params.id
      const res = await this.axios.get(process.env.VUE_APP_API + '/articles/' + articleId)
      const { success, result } = res.data

      if (success) {
        this.article = result
        this.initEditor()
      }
    } catch (error) {
      console.log(error.response.data.message)
    }
  }
}
</script>
