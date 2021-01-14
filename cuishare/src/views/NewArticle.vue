<template lang="pug">
#new-article
  b-container
    ckeditor#editor(:editor='editor' v-model='editorData' :config="editorConfig")
</template>

<script>
import BalloonEditor from '@ckeditor/ckeditor5-build-balloon'

export default {
  name: 'NewArticle',
  data () {
    return {
      editor: BalloonEditor,
      editorData: '<p>Content of the editor.</p>',
      // 編輯器設定
      editorConfig: {
        // 工具列選項
        toolbar: ['bold', 'italic', '|', 'link']
      }
    }
  }
}
</script>
