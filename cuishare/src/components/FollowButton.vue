<template lang="pug">
  b-button.btn.btn--follow(
    variant="outline-warning"
    size="sm"
    @click="follow"
    :class="isFollow? 'btn--following' :''"
  ) {{ isFollow ? '追蹤中': '追蹤' }}
</template>

<script>
export default {
  name: 'FollowButton',
  props: {
    author: Object
  },
  computed: {
    following () {
      return this.$store.state.user.following
    },
    isFollow () {
      return this.following.includes(this.author._id)
    }
  },
  methods: {
    async follow () {
      try {
        const res = await this.axios.patch(process.env.VUE_APP_API + '/users/follow/' + this.author._id)
        const { success, result } = res.data

        if (success) this.$store.commit('following', result)
      } catch (error) {
        alert(error)
      }
    }
  }
}
</script>
