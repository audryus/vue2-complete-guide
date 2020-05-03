import 'font-awesome/css/font-awesome.css'
import Vue from 'vue'

import './config/bootstrap'
import './config/msgs'
import './config/mq'
import './plugins/axios'

import router from './config/router'
import store from './config/store'

import App from './App'

Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')