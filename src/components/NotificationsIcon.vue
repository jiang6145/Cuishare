<template lang="pug">
  .notifications
    b-dropdown(
      right
      no-caret
      variant="link"
    )
      template(#button-content)
        font-awesome-icon.icon(
          :icon="['far', 'bell']"
          size="lg"
          fixed-width
        )
      b-dropdown-item(v-if="notifications.length === 0") 沒有通知
      b-dropdown-item.notifications__item(
        v-else
        v-for="notification in notifications"
        :key="notification._id"
      )
        .notifications__by-user
          b-avatar.notifications__avatar.mr-1(
            :src="notification.byUser.photoUrl"
            size="1.4rem"
            :to="'/blog/'+ notification.byUser._id"
          )
          span.notifications__by-username {{ notification.byUser.username }}
          span.notifications__create-at.ml-auto {{ notification.createDate }}
        p.notifications__text(@click="toArticle(notification.data._id)") {{ notification.text }}
        b-dropdown-divider

</template>

<script>
import { dateDifference } from '../dateDifference'

export default {
  name: 'NotificationsIcon',
  computed: {
    user () {
      return this.$store.state.user
    },
    notifications () {
      return this.user.notifications.concat().map(notification => {
        notification.createDate = dateDifference(notification.createDate)
        return notification
      })
    }
  },
  methods: {
    toArticle (articleId) {
      this.$router.push('/article/' + articleId)
    }
  }
}
</script>
