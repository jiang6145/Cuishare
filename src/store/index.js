import Vue from 'vue'
import Vuex from 'vuex'
import Persistedstate from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      id: '',
      email: '',
      username: '',
      about: '',
      photoUrl: '',
      following: [],
      followers: [],
      articleCategory: [],
      isAdmin: false,
      isBlocked: false
    },
    currentEditArticle: {},
    isLoginModal: true,
    myArticleTabIndex: 0
  },
  mutations: {
    login (state, data) {
      state.user.id = data._id
      state.user.email = data.email
      state.user.username = data.username
      state.user.about = data.about
      state.user.photoUrl = data.photoUrl
      state.user.following = data.following
      state.user.followers = data.followers
      state.user.articleCategory = data.articleCategory
      state.user.isAdmin = data.isAdmin
      state.user.isBlocked = data.isBlocked
    },
    logout (state) {
      state.user.id = ''
      state.user.email = ''
      state.user.username = ''
      state.user.about = ''
      state.user.photoUrl = ''
      state.user.following = []
      state.user.followers = []
      state.user.articleCategory = []
      state.user.isAdmin = false
      state.user.isBlocked = false
    },
    updateUser (state, data) {
      const key = Object.keys(data)
      state.user[key[0]] = data[key[0]]
    },
    following (state, data) {
      const index = state.user.following.findIndex(id => id === data._id)
      if (index < 0) {
        state.user.following.push(data._id)
      } else {
        state.user.following.splice(index, 1)
      }
    },
    toggleModal (state, data) {
      state.isLoginModal = data
    },
    currentEditArticle (state, data) {
      state.currentEditArticle = data
    },
    myArticleTabIndex (state, data) {
      state.myArticleTabIndex = data
    }
  },
  actions: {
  },
  modules: {
  },
  plugins: [Persistedstate()]
})
