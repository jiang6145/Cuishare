import Vue from 'vue'
import Vuex from 'vuex'
import Persistedstate from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      username: '',
      photoUrl: '',
      id: ''
    }
  },
  mutations: {
    login (state, data) {
      state.user.username = data.username
      state.user.photoUrl = data.photoUrl
      state.user.id = data._id
    },
    logout (state) {
      state.user.username = ''
      state.user.photoUrl = ''
      state.user.id = ''
    }
  },
  actions: {
  },
  modules: {
  },
  plugins: [Persistedstate()]
})
