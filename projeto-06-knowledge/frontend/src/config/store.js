import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        isMenuVisible: false,
        user: null
    },
    mutations: {
        toggleMenu(state, isVisible) {
            if (!state.user) {
                state.isMenuVisible = false
                return
            }

            if (isVisible === undefined) {
                state.isMenuVisible = !state.isMenuVisible
            } else {
                state.isMenuVisible = isVisible
            }
        },
        setUser(state, user) {
            state.user = user
            if (user) {
                Vue.prototype.$http.defaults.headers.common['Authorization'] = `bearer ${user.token}`
                state.isMenuVisible = true
                localStorage.setItem(process.env.VUE_APP_USER_KEY, JSON.stringify(user))
            } else {
                delete Vue.prototype.$http.defaults.headers.common['Authorization']
                state.isMenuVisible = false
                localStorage.removeItem(process.env.VUE_APP_USER_KEY)
            }
        }
    }
})