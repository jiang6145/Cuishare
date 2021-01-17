// The editor creator to use.
import ClassicEditorBase from '@ckeditor/ckeditor5-editor-classic/src/classiceditor'

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

export default class ClassicEditor extends ClassicEditorBase {}

// Plugins to include in the build.
ClassicEditor.builtinPlugins = [
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
]

// Editor configuration.
ClassicEditor.defaultConfig = {
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
      // 'imageUpload',
      'blockQuote',
      'insertTable',
      'mediaEmbed',
      'imageInsert',
      '|',
      'undo',
      'redo'
    ]
  },
  title: {
    placeholder: '輸入文章標題'
  },
  placeholder: '寫下你的分享',
  image: {
    toolbar: [
      'imageTextAlternative',
      'imageStyle:full',
      'imageStyle:side'
    ]
  },
  language: 'zh' // This value must be kept in sync with the language defined in webpack.config.js.
}
