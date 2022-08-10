import Vue from 'vue'
import Vuex from 'vuex'
import tabs from '@/store/modules/tabs'
import common from '@/store/modules/common'
import createPersistedState from "vuex-persistedstate"

Vue.use(Vuex)

// const dataState  = createPersistedState({
//   key: 'tabsList',
//   paths: ['tabsList'],
// })

export default new Vuex.Store({
  modules: {
    tabs,
    common
  },
  plugins: [createPersistedState({ storage: window.sessionStorage })]
})
