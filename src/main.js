import { createApp } from 'vue'
import { createStore } from 'vuex'
import App from './App.vue'
import '../index.css'
import router from './router'
import createPersistedState from 'vuex-persistedstate' // prevent loss after browser refresh
import * as Cookies from 'js-cookie' // handle cookies; works for every browser
// import './assets/customStyles.css' // just for testing


// Create a new store instance.
const store = createStore({
    plugins: [createPersistedState()],
    state () {
        return {
            count: 0,
            username: '',
            accessToken: ''
        }
    },

    getters: {
        getAccessToken(state) {
            return state.accessToken
        }
    },

    mutations: {
        increment (state) {
            state.count++
        },
        addAccessToken (state, payload) {
            state.accessToken = payload
        }
    },

    actions: {
        addAccessToken(context, payload) {
            context.commit('addAccessToken', payload)
        }
    }
})

const myV3App = createApp(App)
myV3App
    .use(router)
    .use(store)
myV3App.mount('#app')

// this is not kewl anymore:
// createApp(App).use(router).mount('#app')
