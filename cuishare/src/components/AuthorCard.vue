<template lang="pug">
  b-card.author-card
    .user-photo
      b-img.w-100.user-photo(:src="author.photoUrl")

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
