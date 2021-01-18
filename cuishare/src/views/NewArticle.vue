<template lang="pug">
#new-article
  b-container.editor-container
    Editor
</template>

<script>
import Editor from '../components/Editor'

export default {
  name: 'NewArticle',
  components: {
    Editor
  }
}
</script>
