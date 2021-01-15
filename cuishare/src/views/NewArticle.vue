<template lang="pug">
#new-article
  b-container
    ckeditor(:editor="editor" v-model="editorData" :config="editorConfig")
</template>

<script>
// Ckeditor base editor
import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor'

// Plugins
import AutoImagePlugin from '@ckeditor/ckeditor5-image/src/autoimage'
import AutoformatPlugin from '@ckeditor/ckeditor5-autoformat/src/autoformat'
import AutolinkPlugin from '@ckeditor/ckeditor5-link/src/autolink'
import AutosavePlugin from '@ckeditor/ckeditor5-autosave/src/autosave'
import BlockQuotePlugin from '@ckeditor/ckeditor5-block-quote/src/blockquote'
import BoldPlugin from '@ckeditor/ckeditor5-basic-styles/src/bold'
import EssentialsPlugin from '@ckeditor/ckeditor5-essentials/src/essentials'
import HeadingPlugin from '@ckeditor/ckeditor5-heading/src/heading'
import HighlightPlugin from '@ckeditor/ckeditor5-highlight/src/highlight'
import HorizontalLinePlugin from '@ckeditor/ckeditor5-horizontal-line/src/horizontalline'
import ImagePlugin from '@ckeditor/ckeditor5-image/src/image'
import ImageCaptionPlugin from '@ckeditor/ckeditor5-image/src/imagecaption'
import ImageInsertPlugin from '@ckeditor/ckeditor5-image/src/imageinsert'
import ImageResizePlugin from '@ckeditor/ckeditor5-image/src/imageresize'
import ImageStylePlugin from '@ckeditor/ckeditor5-image/src/imagestyle'
import ImageToolbarPlugin from '@ckeditor/ckeditor5-image/src/imagetoolbar'
import ImageUploadPlugin from '@ckeditor/ckeditor5-image/src/imageupload'
import ItalicPlugin from '@ckeditor/ckeditor5-basic-styles/src/italic'
import LinkPlugin from '@ckeditor/ckeditor5-link/src/link'
import LinkImagePlugin from '@ckeditor/ckeditor5-link/src/linkimage'
import ListPlugin from '@ckeditor/ckeditor5-list/src/list'
import MediaEmbedPlugin from '@ckeditor/ckeditor5-media-embed/src/mediaembed'
import ParagraphPlugin from '@ckeditor/ckeditor5-paragraph/src/paragraph'
import PasteFromOfficePlugin from '@ckeditor/ckeditor5-paste-from-office/src/pastefromoffice'
import SimpleUploadAdapterPlugin from '@ckeditor/ckeditor5-upload/src/adapters/simpleuploadadapter'
import StrikethroughPlugin from '@ckeditor/ckeditor5-basic-styles/src/strikethrough'
import TablePlugin from '@ckeditor/ckeditor5-table/src/table'
import TableToolbarPlugin from '@ckeditor/ckeditor5-table/src/tabletoolbar'
import TextTransformationPlugin from '@ckeditor/ckeditor5-typing/src/texttransformation'
import TitlePlugin from '@ckeditor/ckeditor5-heading/src/title'
import TodoListPlugin from '@ckeditor/ckeditor5-list/src/todolist'
import WordCountPlugin from '@ckeditor/ckeditor5-word-count/src/wordcount'

export default {
  name: 'NewArticle',
  data () {
    return {
      editor: ClassicEditor,
      editorData: '<p>Content of the editor.</p>',
      editorConfig: {
        plugins: [
          AutoImagePlugin,
          AutoformatPlugin,
          AutolinkPlugin,
          AutosavePlugin,
          BlockQuotePlugin,
          BoldPlugin,
          EssentialsPlugin,
          HeadingPlugin,
          HighlightPlugin,
          HorizontalLinePlugin,
          ImagePlugin,
          ImageCaptionPlugin,
          ImageInsertPlugin,
          ImageResizePlugin,
          ImageStylePlugin,
          ImageToolbarPlugin,
          ImageUploadPlugin,
          ItalicPlugin,
          LinkPlugin,
          LinkImagePlugin,
          ListPlugin,
          MediaEmbedPlugin,
          ParagraphPlugin,
          PasteFromOfficePlugin,
          SimpleUploadAdapterPlugin,
          StrikethroughPlugin,
          TablePlugin,
          TableToolbarPlugin,
          TextTransformationPlugin,
          TitlePlugin,
          TodoListPlugin,
          WordCountPlugin
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
        language: 'zh'
      }
    }
  }
}
</script>
