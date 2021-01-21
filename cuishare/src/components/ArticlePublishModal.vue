<template lang="pug">
b-modal#article-publish-modal(
  @hidden="resetModal"
  @ok="publish"
  title="發布XXXX"
  size="md"
  button-size="sm"
  centered
  no-close-on-backdrop
)

  p.text 選擇一張好看的封面圖片
  vue-select-image(
    :dataImages="dataImages"
    :w="'80'"
    :h="'80'"
    :limit="2"
    @onselectimage="onSelectImage")

  p.text 最多添加 5 個標籤
  vue-tags-input(
    v-model="tag"
    :tags="tags"
    :max-tags="maxTags"
    :placeholder="placeholderText"
    @tags-changed="newTags => tags = newTags"
  )

  p.text 設置文章是否公開發佈，設置不公開就只有你看得到這篇文章

  toggle-button(
    :value="isUnlisted"
    :color="'#82C7EB'"
    @change="changeUnlisted"
  )

  font-awesome-icon(
    :icon="isUnlistedIcon"
    :size="'lg'"
    fixed-width
  )

  template(#modal-footer="{ ok }")
    b-button(size="sm" variant="warning" @click="ok()") 確定發佈

</template>
<script>
import VueSelectImage from 'vue-select-image'
import VueTagsInput from '@johmun/vue-tags-input'
import { ToggleButton } from 'vue-js-toggle-button'

export default {
  name: 'ArticlePublishModal',
  components: {
    VueSelectImage,
    VueTagsInput,
    ToggleButton
  },
  data () {
    return {
      coverPhotoUrl: null,
      tag: '',
      tags: [],
      maxTags: 5,
      isUnlisted: false,
      dataImages: [{
        id: '1',
        src: 'https://unsplash.it/200?random',
        alt: 'Alt Image 1'
      }, {
        id: '2',
        src: 'https://unsplash.it/200?random',
        alt: 'Alt Image 2'
      }, {
        id: '3',
        src: 'https://unsplash.it/200?random',
        alt: 'Alt Image 3'
      }, {
        id: '4',
        src: 'https://unsplash.it/200?random',
        alt: 'Alt Image 3'
      }, {
        id: '5',
        src: 'https://unsplash.it/200?random',
        alt: 'Alt Image 3'
      }, {
        id: '6',
        src: 'https://unsplash.it/200?random',
        alt: 'Alt Image 3'
      }, {
        id: '7',
        src: 'https://unsplash.it/200?random',
        alt: 'Alt Image 3'
      }]
    }
  },
  computed: {
    isUnlistedIcon () {
      return this.isUnlisted ? ['far', 'eye-slash'] : ['far', 'eye']
    },
    placeholderText () {
      return this.tags && this.tags.length >= this.maxTags ? '' : '加入標籤'
    }
  },
  methods: {
    onSelectImage ({ src }) {
      this.coverPhotoUrl = src
    },
    changeUnlisted ({ value }) {
      this.isUnlisted = value
    },
    resetModal () {
      this.coverPhotoUrl = null
      this.tag = ''
      this.tags = []
      this.isUnlisted = false
    },
    publish () {

    }
  }
}
</script>

<style lang="scss">
.vue-select-image{
  padding: 0;
  overflow-x: scroll;
  margin-bottom: 2.5rem;

  &__wrapper{
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  }

  &__item{
    padding:0.5rem;
  }

  &__thumbnail--selected{
    border: 2px solid orange;
    box-shadow: 0 0 10px orange;
  }
}

.vue-tags-input[data-v-61d92e31]{
  max-width: 100%;
  width: 100%;
  margin-bottom: 2.5rem;
}

.modal-content{
  border: none;
}

.modal-body{
  padding-top: 3rem;
  padding-bottom: 3rem;
}

.modal-backdrop{
  background-color: #fff;
  opacity:1;
  transition:opacity .2s;
}

.modal-title{
  font-size: 1.2rem;
  font-weight: 900;
}

.text{
  margin-bottom: 5px;
  font-size: 0.9rem;
  color: rgb(128, 128, 128);
}

.fa-eye,.fa-eye-slash{
  margin-bottom: .2rem;
  margin-left: 1rem;;
  color: rgb(143, 143, 143);
}
</style>
