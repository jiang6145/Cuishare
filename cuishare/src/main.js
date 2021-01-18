import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import axios from 'axios'
import vueAxios from 'vue-axios'
import App from './App.vue'
import router from './router'
import store from './store'
import CKEditor from '@ckeditor/ckeditor5-vue2'

import '../src/validation.js'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {
  faHeart,
  faBookmark,
  faCommentDots,
  faQuestionCircle,
  faEnvelope
} from '@fortawesome/free-regular-svg-icons'
import {
  faHeart as fasHeart,
  faBookmark as fasBookmark
} from '@fortawesome/free-solid-svg-icons'

library.add(faHeart, fasHeart, faBookmark, fasBookmark, faCommentDots, faQuestionCircle, faEnvelope)
Vue.component('font-awesome-icon', FontAwesomeIcon)

axios.defaults.withCredentials = true
Vue.config.productionTip = false

Vue.use(CKEditor)
Vue.use(vueAxios, axios)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
