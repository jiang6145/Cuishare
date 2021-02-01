<template lang="pug">
  .admin
    b-container(fluid)
      b-row
        b-col.admin__side-menu(cols="12" md="2")
          b-nav(vertical)
            b-nav-item(to="/admin/member-management") 會員管理
            b-nav-item(to="/admin/article-management") 文章管理
        b-col.offset-3(cols="12" md="8")
          router-view

</template>

<script>
export default {
  name: 'Admin'
}
</script>

<style>

</style>
