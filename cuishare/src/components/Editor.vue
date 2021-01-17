<template lang="pug">
#editor
  #my-editor
  b-button(@click="save") save
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
    save () {
      // const TitlePlugin = this.editor.plugins.get('Title')
      // const articleTitle = TitlePlugin.getTitle()
    }
  }
}
</script>
