import Vue from 'vue'
import './plugins/vuetify'
import './plugins/axios'
import App from './App.vue'

import store from './store/store'

import router from './router'

Vue.config.productionTip = false

Vue.filter('currency', val => { 
	return 'U$ ' + val.toLocaleString()
})

new Vue({
	router,
	store,
	render: h => h(App),
}).$mount('#app')
