import Vue from 'vue'
import Vuex from 'vuex'
import Persistedstate from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      username: '',
      photoUrl: '',
      id: '',
      following: []
    },
    isLoginModal: true
  },
  mutations: {
    login (state, data) {
      state.user.username = data.username
      state.user.photoUrl = data.photoUrl
      state.user.id = data._id
      state.user.following = data.following
    },
    logout (state) {
      state.user.username = ''
      state.user.photoUrl = ''
      state.user.id = ''
    },
    following (state, data) {
      state.user.following = data.following
    },
    toggleModal (state, data) {
      state.isLoginModal = data
    }
  },
  actions: {
  },
  modules: {
  },
  plugins: [Persistedstate()]
})
