<template lang="pug">
  b-navbar-nav.user-menu
    //- Ckeditor 自動保存狀態顯示
    #snippet-autosave-status(v-if="isArticleEditRoute")
      #snippet-autosave-status_spinner
        span#snippet-autosave-status_spinner-label
        span#snippet-autosave-status_spinner-loader

    b-nav-item.user-menu--editor.ml-3
      b-button.custom-btn.letter-spacing-sm(
        v-if="isArticleEditRoute"
        :disabled="isDisabled"
        variant="outline-success"
        v-b-modal.article-publish-modal
        size="sm"
      ) {{ currentEditArticle.isPublished ? '變更文章設定' : '發布文章' }}

    b-nav-item.user-menu--search.mr-md-3(
      v-if="!isArticleEditRoute"
      :class="searchClass"
    )
      //- md 以上的 search
      b-form.d-none.d-md-block(
        @submit.prevent="onSearch"
      )
        font-awesome-icon.icon.icon--search(
          @click="onShowSearch"
          :icon="['fas', 'search']"
          fixed-width
        )
        b-form-input(
          @blur="searchClass['search-show']= flase"
          ref="search-input"
          v-model="searchValue"
          type="text"
          placeholder="搜尋文章..."
        )

      //- md 以下的 search
      font-awesome-icon.icon.d-block.d-md-none(
        v-b-modal.article-search-modal
        :icon="['fas', 'search']"
        :size="'lg'"
        fixed-width
      )

    b-nav-item.user-menu--avatar
      b-dropdown(
        right
        no-caret
        variant="link"
      )
        template(#button-content)
          b-avatar.user-menu__avatar(:src="user.photoUrl" size="2.6rem")

        b-dropdown-item(v-if="user.isBlocked")
          span.tag.tag--blocked.no-hover 帳號已被封鎖
        b-dropdown-divider(v-if="user.isBlocked")

        b-dropdown-item(href='#' :to="'/blog/' + user.id" :disabled="isUserBlocked") 你的首頁
        b-dropdown-divider

        b-dropdown-item(href='#' @click.prevent="createArticle" :disabled="isUserBlocked") 寫文章
        b-dropdown-item(href='#' to="/user-settings" :disabled="isUserBlocked") 個人設定
        b-dropdown-item(href='#' to="/my-article" :disabled="isUserBlocked") 你的文章
        b-dropdown-item(href='#' to="/my-favorites" :disabled="isUserBlocked") 收藏文章
        b-dropdown-item(href='#' to="/my-follow" :disabled="isUserBlocked") 追蹤與粉絲
        b-dropdown-divider

        b-dropdown-item.user-menu__about(href='#') 關於Cuishare
          font-awesome-icon(
            :icon="['far', 'question-circle']"
            :size="'lg'"
            fixed-width
          )
        b-dropdown-item.dropdown--danger(@click="logout") 登出
        b-dropdown-divider(v-if="user.isAdmin")
        b-dropdown-item(
          to="/admin/member-management"
          href='#'
          v-if="user.isAdmin"
        ) 管理員後台
</template>

<script>
export default {
  name: 'UserMenu',
  data () {
    return {
      searchValue: '',
      searchClass: {
        'search-show': false
      }
    }
  },
  computed: {
    user () {
      return this.$store.state.user
    },
    isUserBlocked () {
      return this.user.isBlocked
    },
    isArticleEditRoute () {
      return this.$route.name === 'ArticleEdit'
    },
    currentEditArticle () {
      return this.$store.state.currentEditArticle
    },
    isDisabled () {
      return !this.currentEditArticle.text
    }
  },
  methods: {
    async logout () {
      try {
        await this.axios.delete(process.env.VUE_APP_API + '/users/logout')

        this.$store.commit('logout')
        if (this.$route.path !== '/') this.$router.push('/')
      } catch (error) {
        alert(error.response.data.message)
      }
    },
    async createArticle () {
      try {
        const res = await this.axios.post(process.env.VUE_APP_API + '/articles', {})
        const { success, result } = res.data
        if (success) this.$router.push('/article-edit/' + result._id)
      } catch (error) {
        console.log(error)
      }
    },
    onSearch () {
      this.$router.push('/article-search/' + this.searchValue)
      this.searchValue = ''
    },
    onShowSearch () {
      this.searchClass['search-show'] = !this.searchClass['search-show']
      this.$nextTick(() => this.$refs['search-input'].focus())
    }
  }
}
</script>
