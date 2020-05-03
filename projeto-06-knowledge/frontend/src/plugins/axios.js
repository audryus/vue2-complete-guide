import Vue from 'vue'
import axios from 'axios'

Vue.use({
    install(Vue) {
        Vue.prototype.$http = axios.create({
            baseURL: process.env.VUE_APP_BACKEND_URL,
        })
    }
})

Vue.prototype.$http.interceptors.response.use(function (response) {
        return response;
    }, function (error) {
        if (401 === error.response.status) {
            window.location = '/'
        }
        if (error.response && error.response.data) {
            Vue.toasted.global.defaultError({msg: error.response.data})
        } else if (typeof error === 'string') {
            Vue.toasted.global.defaultError({msg: error})
        } else {
            Vue.toasted.global.defaultError()
        }

        return Promise.reject(error);
    }
);