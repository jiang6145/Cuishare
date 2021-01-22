<template lang="pug">
  b-card.author-card
    .user-photo
      b-avatar(:src="author.photoUrl" size="7rem")

    b-card-text
      p.username {{ author.username }}
      p.about {{ author.about }}

    FollowButton(:author="author")
</template>

<script>
import FollowButton from '../components/FollowButton'

export default {
  name: 'AuthorCard',
  components: {
    FollowButton
  },
  props: {
    author: Object
  }
}
</script>
