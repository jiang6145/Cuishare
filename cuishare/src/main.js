import '@babel/polyfill'
import 'mutationobserver-shim'
import ImgInputer from 'vue-img-inputer'
import CKEditor from '@ckeditor/ckeditor5-vue2'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import axios from 'axios'
import vueAxios from 'vue-axios'
import App from './App.vue'
import router from './router'
import store from './store'
import '../src/validation.js'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {
  faHeart,
  faBookmark,
  faCommentDots,
  faQuestionCircle,
  faEnvelope,
  faEye,
  faEyeSlash
} from '@fortawesome/free-regular-svg-icons'
import {
  faHeart as fasHeart,
  faBookmark as fasBookmark,
  faPencilAlt as fasPencilAlt,
  faEllipsisV as fasEllipsisV,
  faChevronDown as fasChevronDown
} from '@fortawesome/free-solid-svg-icons'

library.add(faHeart, fasHeart, faBookmark, fasBookmark, faCommentDots, faQuestionCircle, faEnvelope, fasPencilAlt, faEye, faEyeSlash, fasEllipsisV, fasChevronDown)
Vue.component('font-awesome-icon', FontAwesomeIcon)

axios.defaults.withCredentials = true
Vue.config.productionTip = false

Vue.component('ImgInputer', ImgInputer)
Vue.use(CKEditor)
Vue.use(vueAxios, axios)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
