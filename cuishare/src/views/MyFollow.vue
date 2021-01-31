<template lang="pug">
  .my-follow
    b-container
      b-row
        b-col.mx-auto.mb-4(cols="12" lg="10")
          h2.my-follow__title 追蹤與粉絲
        b-col.mx-auto(cols="12" lg="10")
          b-tabs
            b-tab(:title="'追蹤中 '+ following.length")
              .follow-item(v-for="author in following")
                b-avatar.follow-item__avatar(
                  :src="author.photoUrl"
                  size="5rem"
                  :to="'/blog/'+ author._id"
                )
                .follow-item__info
                  p.follow-item__username {{ author.username }}
                    b-dropdown.follow-item__dropdown(
                      variant="link"
                      no-caret
                      right
                    )
                      template(#button-content)
                        font-awesome-icon.icon.follow-item__icon(
                          :icon="['fas','chevron-down']"
                          fixed-width
                        )
                      b-dropdown-item(
                        @click="lookHisFollowers(author)"
                        v-b-modal="'his-follow-modal'"
                      ) 他的粉絲
                      b-dropdown-item(
                        @click="lookHisFollowing(author)"
                        v-b-modal="'his-follow-modal'"
                      ) 他的追蹤
                      b-dropdown-item.dropdown--danger(@click="unFollowing(author)") 取消追蹤
                  p.follow-item__about {{ author.about }}
                  .follow-item__his-follow
                    span.tag.no-hover {{ '粉絲 ' + author.followers.length }}
                    span.tag.no-hover {{ '追蹤中 ' + author.following.length }}

            b-tab(:title="'粉絲 '+ followers.length")
              .follow-item(v-for="author in followers")
                b-avatar.follow-item__avatar(
                  :src="author.photoUrl"
                  size="5rem"
                  :to="'/blog/'+ author._id"
                )
                .follow-item__info
                  p.follow-item__username {{ author.username }}
                    b-dropdown.follow-item__dropdown(
                      variant="link"
                      no-caret
                      right
                    )
                      template(#button-content)
                        font-awesome-icon.icon.follow-item__icon(
                          :icon="['fas','chevron-down']"
                          fixed-width
                        )
                      b-dropdown-item(
                        @click="lookHisFollowers(author)"
                        v-b-modal="'his-follow-modal'"
                      ) 他的粉絲
                      b-dropdown-item(
                        @click="lookHisFollowing(author)"
                        v-b-modal="'his-follow-modal'"
                      ) 他的追蹤
                  p.follow-item__about {{ author.about }}
                  .follow-item__his-follow
                    span.tag.no-hover {{ '粉絲 ' + author.followers.length }}
                    span.tag.no-hover {{ '追蹤中 ' + author.following.length }}

    //- modal
    b-modal#his-follow-modal(
      :title="hisFollow.modalTitle"
      hide-footer
    )
      .follow-item.py-3(v-for="author in hisFollow.follow")
        b-avatar.follow-item__avatar.mr-3(
          size="3rem"
          :key="author._id"
          :src="author.photoUrl"
          :to="'/blog/'+ author._id"
        )
        span.follow-item__username {{author.username}}
        FollowButton.ml-auto(:author="author")
</template>

<script>
import FollowButton from '../components/FollowButton'
export default {
  name: 'MyFollowing',
  components: {
    FollowButton
  },
  data () {
    return {
      following: [],
      followers: [],
      hisFollow: {}
    }
  },
  methods: {
    async unFollowing (author) {
      try {
        const isUnFavorites = await this.$bvModal.msgBoxConfirm(`你確定不要繼續追蹤「${author.username}」嗎?`, {
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
      this.hisFollow = {
        modalTitle: '追蹤中 ' + author.following.length,
        follow: author.following
      }
    },
    lookHisFollowers (author) {
      this.hisFollow = {
        modalTitle: '粉絲 ' + author.followers.length,
        follow: author.followers
      }
    }
  },
  async mounted () {
    try {
      const res = await this.axios.get(process.env.VUE_APP_API + '/users/follow/following')
      const { success, result } = res.data

      if (success) {
        this.following = result.following
        this.followers = result.followers
      }
    } catch (error) {
      console.log(error)
    }
  }
}
</script>
