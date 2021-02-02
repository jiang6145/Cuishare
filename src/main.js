import '@babel/polyfill'
import 'mutationobserver-shim'
import './plugins/bootstrap-vue'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import vueAxios from 'vue-axios'
import ImgInputer from 'vue-img-inputer'
import CKEditor from '@ckeditor/ckeditor5-vue2'
import Loading from 'vue-loading-overlay'
import Toasted from 'vue-toasted'
import 'vue-loading-overlay/dist/vue-loading.css'
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
  faEyeSlash,
  faBell
} from '@fortawesome/free-regular-svg-icons'
import {
  faHeart as fasHeart,
  faBookmark as fasBookmark,
  faPencilAlt as fasPencilAlt,
  faEllipsisV as fasEllipsisV,
  faChevronDown as fasChevronDown,
  faSearch as fasSearch
} from '@fortawesome/free-solid-svg-icons'

library.add(faHeart, fasHeart, faBookmark, fasBookmark, faCommentDots, faQuestionCircle, faEnvelope, fasPencilAlt, faEye, faEyeSlash, fasEllipsisV, fasChevronDown, fasSearch, faBell)
Vue.component('font-awesome-icon', FontAwesomeIcon)

axios.defaults.withCredentials = true
Vue.config.productionTip = false

Vue.component('ImgInputer', ImgInputer)
Vue.use(vueAxios, axios)
Vue.use(CKEditor)
Vue.use(Loading, {
  color: '#FFB015',
  backgroundColor: '#fff',
  opacity: 1,
  lockScroll: true
})
Vue.use(Toasted, {
  position: 'top-center',
  duration: 2000,
  keepOnHover: true,
  fitToScreen: true,
  singleton: true
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
