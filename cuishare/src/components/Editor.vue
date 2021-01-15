<template lang="pug">
#editor
  b-container
    ckeditor(:editor="editor" v-model="editorData" :config="editorConfig" @destroy="onEditorDestroy")
    b-button(@click="onEditorSave()") 保存
</template>

<script>
// Ckeditor base editor
import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor'

// Plugins
import AutoImage from '@ckeditor/ckeditor5-image/src/autoimage'
import Autoformat from '@ckeditor/ckeditor5-autoformat/src/autoformat'
import Autolink from '@ckeditor/ckeditor5-link/src/autolink'
import Autosave from '@ckeditor/ckeditor5-autosave/src/autosave'
import BlockQuote from '@ckeditor/ckeditor5-block-quote/src/blockquote'
import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold'
import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials'
import Heading from '@ckeditor/ckeditor5-heading/src/heading'
import Highlight from '@ckeditor/ckeditor5-highlight/src/highlight'
import HorizontalLine from '@ckeditor/ckeditor5-horizontal-line/src/horizontalline'
import Image from '@ckeditor/ckeditor5-image/src/image'
import ImageCaption from '@ckeditor/ckeditor5-image/src/imagecaption'
import ImageInsert from '@ckeditor/ckeditor5-image/src/imageinsert'
import ImageResize from '@ckeditor/ckeditor5-image/src/imageresize'
import ImageStyle from '@ckeditor/ckeditor5-image/src/imagestyle'
import ImageToolbar from '@ckeditor/ckeditor5-image/src/imagetoolbar'
import ImageUpload from '@ckeditor/ckeditor5-image/src/imageupload'
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic'
import Link from '@ckeditor/ckeditor5-link/src/link'
import LinkImage from '@ckeditor/ckeditor5-link/src/linkimage'
import List from '@ckeditor/ckeditor5-list/src/list'
import MediaEmbed from '@ckeditor/ckeditor5-media-embed/src/mediaembed'
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph'
import PasteFromOffice from '@ckeditor/ckeditor5-paste-from-office/src/pastefromoffice'
import SimpleUploadAdapter from '@ckeditor/ckeditor5-upload/src/adapters/simpleuploadadapter'
import Strikethrough from '@ckeditor/ckeditor5-basic-styles/src/strikethrough'
import Table from '@ckeditor/ckeditor5-table/src/table'
import TableToolbar from '@ckeditor/ckeditor5-table/src/tabletoolbar'
import TextTransformation from '@ckeditor/ckeditor5-typing/src/texttransformation'
import Title from '@ckeditor/ckeditor5-heading/src/title'
import TodoList from '@ckeditor/ckeditor5-list/src/todolist'
import WordCount from '@ckeditor/ckeditor5-word-count/src/wordcount'

export default {
  name: 'Editor',
  data () {
    return {
      editor: ClassicEditor,
      editorData: null,
      editorConfig: {
        plugins: [
          AutoImage,
          Autoformat,
          Autolink,
          Autosave,
          BlockQuote,
          Bold,
          Essentials,
          Heading,
          Highlight,
          HorizontalLine,
          Image,
          ImageCaption,
          ImageInsert,
          ImageResize,
          ImageStyle,
          ImageToolbar,
          ImageUpload,
          Italic,
          Link,
          LinkImage,
          List,
          MediaEmbed,
          Paragraph,
          PasteFromOffice,
          SimpleUploadAdapter,
          Strikethrough,
          Table,
          TableToolbar,
          TextTransformation,
          Title,
          TodoList,
          WordCount
        ],
        toolbar: {
          items: [
            'heading',
            '|',
            'bold',
            'italic',
            'strikethrough',
            'link',
            'horizontalLine',
            'highlight',
            '|',
            'bulletedList',
            'numberedList',
            'todoList',
            '|',
            'imageUpload',
            'blockQuote',
            'insertTable',
            'mediaEmbed',
            'imageInsert',
            '|',
            'undo',
            'redo'
          ]
        },
        language: 'zh',
        title: {
          placeholder: '輸入文章標題'
        },
        placeholder: '寫下你的分享'
      }
    }
  },
  methods: {
    onEditorSave () {
      // const editorData = this.editorData
      // const parser = new DOMParser()
      // const htmlDocument = parser.parseFromString(editorData, 'text/xml')
      // const title = htmlDocument.querySelector('h1')
    },
    onEditorDestroy () {
      console.log('Destroy')
    }
  }
}
</script>
