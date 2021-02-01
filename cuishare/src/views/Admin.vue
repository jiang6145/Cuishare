<template lang="pug">
  .admin
    b-container(fluid)
      b-row
        b-col.admin__side-menu(cols="12" lg="2")
          b-nav(vertical)
            b-nav-item(to="/admin/member-management") 會員管理
            b-nav-item(to="/admin/article-management") 文章管理
        b-col.offset-lg-3(cols="12" lg="8")
          router-view

</template>

<script>
export default {
  name: 'Admin'
}
</script>

<style>

</style>
