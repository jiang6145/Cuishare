<template lang="pug">
#article
  b-container.editor-container

</template>

<script>
import Editor from '../components/Editor'

export default {
  name: 'Article',
  components: {
    Editor
  },
  mounted () {
    console.log(Editor)
    // console.log(this.$route)
  }
}
</script>
