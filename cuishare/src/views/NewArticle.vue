<template lang="pug">
#new-article
  b-container
    ckeditor(:editor="editor" v-model="editorData" :config="editorConfig")
</template>

<script>
import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor.js'

import AutoImage from '@ckeditor/ckeditor5-image/src/autoimage.js'
import Autoformat from '@ckeditor/ckeditor5-autoformat/src/autoformat.js'
import Autolink from '@ckeditor/ckeditor5-link/src/autolink.js'
import Autosave from '@ckeditor/ckeditor5-autosave/src/autosave.js'
import BlockQuote from '@ckeditor/ckeditor5-block-quote/src/blockquote.js'
import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold.js'
import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials.js'
import Heading from '@ckeditor/ckeditor5-heading/src/heading.js'
import Highlight from '@ckeditor/ckeditor5-highlight/src/highlight.js'
import HorizontalLine from '@ckeditor/ckeditor5-horizontal-line/src/horizontalline.js'
import Image from '@ckeditor/ckeditor5-image/src/image.js'
import ImageCaption from '@ckeditor/ckeditor5-image/src/imagecaption.js'
import ImageInsert from '@ckeditor/ckeditor5-image/src/imageinsert.js'
import ImageResize from '@ckeditor/ckeditor5-image/src/imageresize.js'
import ImageStyle from '@ckeditor/ckeditor5-image/src/imagestyle.js'
import ImageToolbar from '@ckeditor/ckeditor5-image/src/imagetoolbar.js'
import ImageUpload from '@ckeditor/ckeditor5-image/src/imageupload.js'
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic.js'
import Link from '@ckeditor/ckeditor5-link/src/link.js'
import LinkImage from '@ckeditor/ckeditor5-link/src/linkimage.js'
import List from '@ckeditor/ckeditor5-list/src/list.js'
import MediaEmbed from '@ckeditor/ckeditor5-media-embed/src/mediaembed.js'
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph.js'
import PasteFromOffice from '@ckeditor/ckeditor5-paste-from-office/src/pastefromoffice'
import SimpleUploadAdapter from '@ckeditor/ckeditor5-upload/src/adapters/simpleuploadadapter.js'
import Strikethrough from '@ckeditor/ckeditor5-basic-styles/src/strikethrough.js'
import Table from '@ckeditor/ckeditor5-table/src/table.js'
import TableToolbar from '@ckeditor/ckeditor5-table/src/tabletoolbar.js'
import TextTransformation from '@ckeditor/ckeditor5-typing/src/texttransformation.js'
import Title from '@ckeditor/ckeditor5-heading/src/title.js'
import TodoList from '@ckeditor/ckeditor5-list/src/todolist'
import WordCount from '@ckeditor/ckeditor5-word-count/src/wordcount.js'

export default {
  name: 'NewArticle',
  data () {
    return {
      editor: ClassicEditor,
      editorData: '<p>Content of the editor.</p>',
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
        }
      }
    }
  }
}
</script>
