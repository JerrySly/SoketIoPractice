import { createStore } from 'vuex'

export default createStore({
  state: {
    nickConfig: null,
    socket: null
  },
  getters: {
  },
  mutations: {
    setSocket(state,value){
      state.socket = value
    },
    setNick(state,value){
      state.nickConfig = value
    }
  },
  actions: {
  },
  modules: {
  }
})
