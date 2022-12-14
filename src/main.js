import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import '../src/assets/css/global.css'
import '../src/assets/iconfont/iconfont.css'
import Contextmenu from "vue-contextmenujs"
import axios from "axios"
import moment from "moment"

Vue.config.productionTip = false
Vue.prototype.$http = axios
Vue.prototype.$moment = moment
Vue.use(Contextmenu)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

export default Vue
