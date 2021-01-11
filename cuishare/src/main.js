import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import axios from 'axios'
import vueAxios from 'vue-axios'

import App from './App.vue'
import router from './router'
import store from './store'
import '../src/validation.js'

axios.defaults.withCredentials = true
Vue.config.productionTip = false

Vue.use(vueAxios, axios)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
