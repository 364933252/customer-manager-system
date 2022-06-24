import Vue from 'vue'
import Vuex from 'vuex'
import tabs from '@/store/modules/tabs'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    tabs
  }
})
