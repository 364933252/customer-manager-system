import Vue from 'vue'
import Vuex from 'vuex'
import tabs from '@/store/modules/tabs'
import common from '@/store/modules/common'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    tabs,
    common
  }
})
