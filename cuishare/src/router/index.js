import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: 'Cuishare | 首頁',
      isLogin: false
    }
  },
  {
    path: '/article/:id',
    name: 'ArticleRead',
    component: () => import(/* webpackChunkName: "article" */ '../views/ArticleRead.vue'),
    meta: { isLogin: false }
  },
  {
    path: '/new-article/',
    name: 'NewArticle',
    component: () => import(/* webpackChunkName: "new-article" */ '../views/NewArticle.vue'),
    meta: { isLogin: true }
  },
  {
    path: '/article-edit/:id',
    name: 'ArticleEdit',
    component: () => import(/* webpackChunkName: "article-edit" */ '../views/ArticleEdit.vue'),
    meta: { isLogin: true }
  },
  {
    path: '/blog/:id',
    name: 'Blog',
    component: () => import(/* webpackChunkName: "blog" */ '../views/Blog.vue'),
    meta: { isLogin: false }
  },
  {
    path: '/user-settings',
    name: 'UserSettings',
    component: () => import(/* webpackChunkName: "user-settings" */ '../views/UserSettings.vue'),
    meta: { isLogin: true }
  }
]

const router = new VueRouter({
  routes
})

router.afterEach((to, from) => {
  document.title = to.meta.title
})

export default router
