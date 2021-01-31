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
      articleCategory: []
    },
    currentEditArticle: {},
    isLoginModal: true
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
    },
    updateUser (state, data) {
      console.log(data)
      const key = Object.keys(data)
      state.user[key[0]] = data[key[0]]
    },
    following (state, data) {
      state.user.following = data.following
    },
    toggleModal (state, data) {
      state.isLoginModal = data
    },
    currentEditArticle (state, data) {
      state.currentEditArticle = data
    }
  },
  actions: {
  },
  modules: {
  },
  plugins: [Persistedstate()]
})
