import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { isLogin: false }
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
    meta: { isLogin: false }
  },
  {
    path: '/article/:id',
    name: 'ArticleRead',
    component: () => import(/* webpackChunkName: "article" */ '../views/ArticleRead.vue'),
    meta: { isLogin: false }
  },
  {
    path: '/article-edit/:id',
    name: 'ArticleEdit',
    component: () => import(/* webpackChunkName: "article-edit" */ '../views/ArticleEdit.vue'),
    meta: { isLogin: true }
  },
  {
    path: '/article-search/:value',
    name: 'ArticleSearch',
    component: () => import(/* webpackChunkName: "article-search" */ '../views/ArticleSearch.vue'),
    meta: { isLogin: false }
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
  },
  {
    path: '/my-article',
    name: 'MyArticle',
    component: () => import(/* webpackChunkName: "my-article" */ '../views/MyArticle.vue'),
    meta: { isLogin: true }
  },
  {
    path: '/my-favorites',
    name: 'MyFavorites',
    component: () => import(/* webpackChunkName: "my-favorites" */ '../views/MyFavorites.vue'),
    meta: { isLogin: true }
  },
  {
    path: '/my-follow',
    name: 'MyFollow',
    component: () => import(/* webpackChunkName: "my-follow" */ '../views/MyFollow.vue'),
    meta: { isLogin: true }
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () => import(/* webpackChunkName: "admin" */ '../views/Admin.vue'),
    children: [
      {
        path: 'member-management',
        name: 'MemberManagement',
        component: () => import(/* webpackChunkName: "member-management" */ '../components/admin/MemberManagement.vue'),
        meta: {
          isLogin: true,
          isAdmin: true
        }
      },
      {
        path: 'article-management',
        name: 'ArticleManagement',
        component: () => import(/* webpackChunkName: "article-management" */ '../components/admin/ArticleManagement.vue'),
        meta: {
          isLogin: true,
          isAdmin: true
        }
      }
    ],
    meta: {
      isLogin: true,
      isAdmin: true
    }
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.isLogin && (!store.state.user.id || store.state.user.isBlocked)) {
    next('/')
  } else if (to.meta.isAdmin && (!store.state.user.isAdmin || !store.state.user.id)) {
    next('/')
  } else {
    next()
  }
})

router.afterEach((to, from) => {
  document.title = 'Cuishare'
})

export default router
