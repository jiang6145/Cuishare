<template lang="pug">
.article.article--editor-read
  b-container
    b-row
      b-col.mx-auto(cols="12" lg="10")
        #editor-read
        .article--editor-read__interactive
          ArticleInteractive(
            v-if="article"
            :article="article"
            :size="'lg'"
            :isShowComment="true"
          )

        .article--editor-read__author(v-if="article")
          b-avatar.article__avatar(
            :src="article.author.photoUrl"
            :to="'/blog/'+article.author._id"
            size="5rem"
          )
          .article__info
            span.article__author-name {{ article.author.username }}
            p.article__author-about {{ article.author.about }}
          FollowButton(:author="article.author")

  CommentSidebar(v-if="article" :article="article")
</template>

<script>
import ClassicEditor from '../ckeditor'
import ArticleInteractive from '../components/ArticleInteractive'
import FollowButton from '../components/FollowButton'
import CommentSidebar from '../components/CommentSidebar'

export default {
  name: 'ArticleRead',
  components: {
    ArticleInteractive,
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
        .create(document.querySelector('#editor-read'), {
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
    const loader = this.$loading.show()
    try {
      const articleId = this.$route.params.id
      const res = await this.axios.get(process.env.VUE_APP_API + '/articles/' + articleId)
      const { success, result } = res.data
      if (result.isBlocked) {
        this.$router.go(-1)
        this.$toasted.error('此文章已被封鎖，不可閱讀')
      }
      if (success) {
        this.article = result
        this.initEditor()
      }
    } catch (error) {
      console.log(error)
    }

    loader.hide()
  }
}
</script>
