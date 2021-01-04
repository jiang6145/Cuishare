import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      email: '',
      username: '',
      id: ''
    }
  },
  mutations: {
    login (state, data) {
      state.user.email = data.email
      state.user.username = data.username
      state.user.id = data._id
    },
    logout (state) {
      state.user.email = ''
      state.user.username = ''
      state.user.id = ''
    }
  },
  actions: {
  },
  modules: {
  }
})
