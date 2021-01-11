<template lang="pug">
#navbar
  b-navbar(toggleable="sm" type="dark" variant="dark" fixed="true")
    b-container
      b-navbar-brand(href="#") LOGO

      //- RWD 導航列
      b-navbar-toggle.ml-auto(target="nav-collapse")
      b-collapse#nav-collapse(is-nav)
        b-navbar-nav.ml-auto
          b-nav-item(href="#") 關於我們
          b-nav-item(href="#") 常見問題
          b-nav-item(href="#") 註冊會員

      b-button.login-btn(size="sm" v-b-modal="'registerAndLoginModal'") 登入
</template>

<script>
export default {
  name: 'Navbar'
}
</script>
