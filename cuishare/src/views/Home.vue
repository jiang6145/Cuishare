<template lang="pug">
#home
  b-container

</template>

<script>
export default {
  name: 'Home',
  async mounted () {
    try {
      const res = await this.axios.get(process.env.VUE_APP_API + '/articles')
      const { result } = res.data
      console.log(result)
    } catch (error) {

    }
  }
}
</script>
