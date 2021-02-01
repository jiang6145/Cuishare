<template lang="pug">
  div
    b-button.custom-btn.custom-btn--follow(
      v-if="!isMyself"
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
    user () {
      return this.$store.state.user
    },
    isFollow () {
      return this.user.following.includes(this.author._id)
    },
    isMyself () {
      return this.author._id === this.user.id
    }
  },
  methods: {
    async follow () {
      try {
        if (!this.user.id) return this.$bvModal.show('user-modal')

        const res = await this.axios.patch(process.env.VUE_APP_API + '/users/follow/' + this.author._id)
        const { success, result } = res.data
        console.log(result)
        if (success) this.$store.commit('following', result)
      } catch (error) {
        alert(error)
      }
    }
  }
}
</script>
