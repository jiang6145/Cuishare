<template lang="pug">
#navbar
  b-navbar(toggleable='lg', type='dark', variant='info')
    .container
      b-navbar-brand(href='#') LOGO
      b-navbar-toggle(target='nav-collapse')
      b-collapse#nav-collapse(is-nav)
        b-navbar-nav
          b-nav-item(href='#') 關於我們
        b-navbar-nav.ml-auto
          b-button.my-2.my-sm-0(v-b-modal.modal-login, size='md') Login

  b-modal#modal-login(title='註冊')
</template>
<script>
export default {
  name: 'Navbar'
}
</script>
