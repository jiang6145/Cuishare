<template lang="pug">
b-modal#article-publish-modal(
  @hidden="resetModal"
  @ok="publish"
  @show="onShow"
  :title="article.title"
  size="md"
  button-size="sm"
  centered
  no-close-on-backdrop
)

  p.publish-modal__text {{ dataImages.length>0 ?  '選擇一張好看的封面圖片' : '可以在文章中添加一些圖片來當作封面圖'}}
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
    @change="changeUnlisted"
  )

  font-awesome-icon(
    :icon="isUnlistedIcon"
    :size="'lg'"
    fixed-width
  )

  template(#modal-footer="{ ok }")
    b-button(size="sm" variant="warning" @click="ok()") {{ currentEditArticle.isPublished ? '保存' : '發佈' }}

</template>
<script>
import * as readingTime from 'reading-time'
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
  props: {
    editor: Object,
    article: Object
  },
  data () {
    return {
      dataImages: [],
      coverPhotoUrl: '',
      subTitle: '',
      tag: '',
      tags: [],
      maxTags: 5,
      isUnlisted: false
    }
  },
  computed: {
    user () {
      return this.$store.state.user
    },
    isUnlistedIcon () {
      return this.isUnlisted ? ['far', 'eye-slash'] : ['far', 'eye']
    },
    placeholderText () {
      return this.tags && this.tags.length >= this.maxTags ? '' : '加入標籤'
    },
    currentEditArticle () {
      return this.$store.state.currentEditArticle
    }
  },
  methods: {
    onShow () {
      // 取得文章所有圖片的src
      this.dataImages = Array.from(new DOMParser().parseFromString(this.editor.getData(), 'text/html')
        .querySelectorAll('img'))
        .map((img, index) => {
          return {
            id: index,
            src: img.getAttribute('src'),
            alt: this.article.title + '的圖片' + (index + 1)
          }
        })

      if (this.article.coverPhotoUrl) {
        this.coverPhotoUrl = this.article.coverPhotoUrl
      } else if (this.dataImages.length > 0) {
        this.coverPhotoUrl = this.dataImages[0].src
      }

      // 取得文章第一個有內容的 <p>
      this.subTitle = Array.from(new DOMParser().parseFromString(this.editor.getData(), 'text/html')
        .querySelectorAll('p'))
        .find(p => p.innerText.trim() !== '')
    },
    onSelectImage ({ src }) {
      this.coverPhotoUrl = src
    },
    changeUnlisted ({ value }) {
      this.isUnlisted = value
    },
    resetModal () {
      this.dataImages = []
      this.coverPhotoUrl = null
      this.subTitle = ''
      this.tag = ''
      this.tags = []
      this.isUnlisted = false
    },
    async publish () {
      const stats = readingTime(this.article.text)
      const data = {
        title: this.article.title,
        subTitle: this.subTitle ? this.subTitle.innerText : '',
        coverPhotoUrl: this.coverPhotoUrl ? this.coverPhotoUrl : '',
        readingTime: stats.text,
        isPublished: true,
        isDraft: false,
        isUnlisted: this.isUnlisted
      }
      if (this.tags.length > 0) data.tags = this.tags.map(tag => tag.text)
      if (!this.currentEditArticle.isPublished) data.publishedDate = new Date()

      try {
        const res = await this.axios.patch(process.env.VUE_APP_API + '/articles/' + this.article._id, data)
        const { success, result } = res.data
        if (success && !this.currentEditArticle.isPublished) {
          this.$toasted.success('文章發佈成功，前往此文章')
          this.$router.push('/article/' + this.article._id)

          // if (this.user.followers > 0) {
          const notificationData = {
            text: '發佈了新文章「' + result.title + '」',
            byUser: result.author,
            data: {
              title: result.title,
              _id: result._id
            }
          }
          console.log(notificationData)
          await this.axios.post(process.env.VUE_APP_API + '/notifications/', notificationData)
          // }
          return
        }
        this.$toasted.success('文章修改成功')
        this.$router.go(-1)
      } catch (error) {
        this.$toasted.error(error.response.data.message)
        console.log(error)
      }
    }
  }
}
</script>
