<template lang="pug">
b-modal#article-publish-modal(
  @hidden="resetModal"
  @ok="publish"
  :title="articleData.title"
  size="md"
  button-size="sm"
  centered
  no-close-on-backdrop
)

  p.publish-modal__text 選擇一張好看的封面圖片
  vue-select-image(
    :dataImages="dataImages"
    :w="'80'"
    :h="'80'"
    :limit="2"
    @onselectimage="onSelectImage")

  p.publish-modal__text 最多添加 5 個標籤
  vue-tags-input(
    v-model="tag"
    :tags="tags"
    :max-tags="maxTags"
    :placeholder="placeholderText"
    @tags-changed="newTags => tags = newTags"
  )

  p.publish-modal__text 設置文章是否公開發佈，設置不公開就只有你看得到這篇文章

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
      isUnlisted: false
    }
  },
  computed: {
    articleData () {
      return this.$store.state.articleData
    },
    dataImages () {
      return this.articleData.imagesSrc
    },
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
    async publish () {
      const articleId = this.articleData.articleId

      const publishArticleData = {
        title: this.articleData.title,
        subTitle: this.articleData.subTitle,
        text: this.articleData.text,
        coverPhotoUrl: this.coverPhotoUrl ? this.coverPhotoUrl : (this.dataImages.length > 0 ? this.dataImages[0].src : ''),
        tags: this.tags.map(tag => tag.text),
        isPublish: true,
        isDraft: false,
        isUnlisted: this.isUnlisted
      }

      try {
        const res = await this.axios.patch(process.env.VUE_APP_API + '/articles/' + articleId, publishArticleData)

        if (!res.data.success) return
        this.$store.commit('articleData', {})
        this.$router.push('/article/' + articleId)
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>
