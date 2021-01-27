<template lang="pug">
  .my-following
    b-container
      b-row
        b-col.mx-auto.mb-5(cols="12" lg="10")
          h2.my-following__title 你關注的作者
        b-col.mx-auto(cols="12" lg="10")
          .following-item(v-for="author in following")
            b-avatar.following-item__avatar(
              :src="author.photoUrl"
              size="5rem"
              :to="'/blog/'+ author._id"
            )
            .following-item__info
              p.following-item__username {{ author.username }}
                b-dropdown.following-item__dropdown(
                  size="lg"
                  variant="link"
                  no-caret
                )
                  template(#button-content)
                    font-awesome-icon.icon.following-item__icon(
                      :icon="['fas','chevron-down']"
                      fixed-width
                    )
                  b-dropdown-item(
                    @click="lookHisFollowing(author)"
                    v-b-modal="'look-his-follow-modal'"
                  ) 看他關注的作者
                  b-dropdown-item(
                    @click="lookHisFollowers(author)"
                    v-b-modal="'look-his-follow-modal'"
                  ) 看他的粉絲
                  b-dropdown-item.dropdown--danger(@click="unFollowing(author)") 取消追蹤

              p.following-item__about {{ author.about }}
              p.following-item__his-follow {{ hisFollowText(author) }}

    b-modal#look-his-follow-modal(
      :title="lookHisFollowData.modalTitle"
      hide-footer
    )
      b-avatar-group(size="4rem")
        b-avatar.following-item__avatar(
          v-for="data in lookHisFollowData.following"
          v-b-tooltip.hover.bottom
          :title="data.username"
          :key="data._id"
          :src="data.photoUrl"
          :to="'/blog/'+ data._id"
        )
</template>

<script>
export default {
  name: 'MyFollowing',
  data () {
    return {
      following: [],
      lookHisFollowData: {}
    }
  },
  methods: {
    hisFollowText (author) {
      const followersLength = author.followers.length
      return `${author.username} 目前有 ${followersLength} 位粉絲`
    },
    async unFollowing (author) {
      try {
        const isUnFavorites = await this.$bvModal.msgBoxConfirm(`你確定不要繼續關注「${author.username}」了嗎?`, {
          title: '取消關注',
          size: 'md',
          buttonSize: 'sm',
          okVariant: 'danger',
          okTitle: '確定',
          cancelTitle: '取消',
          hideHeaderClose: true,
          centered: true,
          headerClass: 'border-bottom-0 justify-content-center',
          bodyClass: 'text-center',
          footerClass: 'border-top-0 justify-content-center'
        })
        if (!isUnFavorites) return

        const res = await this.axios.patch(process.env.VUE_APP_API + '/users/follow/' + author._id)
        const { success, result } = res.data
        if (success) {
          this.$store.commit('following', result)

          const index = this.following.findIndex(({ _id }) => _id === author._id)
          this.following.splice(index, 1)
        }
      } catch (error) {
        console.log(error)
      }
    },
    lookHisFollowing (author) {
      let modalTitle = `${author.username} 目前沒有關注任何人`
      if (author.following.length > 0) modalTitle = `${author.username} 關注了 ${author.following.length} 位作者`

      this.lookHisFollowData = {
        modalTitle,
        following: author.following
      }
    },
    lookHisFollowers (author) {
      let modalTitle = `${author.username} 目前沒有粉絲`
      if (author.followers.length > 0) modalTitle = `${author.username} 目前有 ${author.followers.length} 位粉絲`

      this.lookHisFollowData = {
        modalTitle,
        following: author.followers
      }
    }
  },
  async mounted () {
    try {
      const res = await this.axios.get(process.env.VUE_APP_API + '/users/follow/following')
      const { success, result } = res.data
      if (success) this.following = result.following
    } catch (error) {
      console.log(error)
    }
  }
}
</script>
