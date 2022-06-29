import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import '../src/assets/css/global.css'
import '../src/assets/iconfont/iconfont.css'
import Contextmenu from "vue-contextmenujs"

Vue.config.productionTip = false

Vue.use(Contextmenu)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

export default Vue
