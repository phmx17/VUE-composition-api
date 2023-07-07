import { createApp } from 'vue'
import App from './App.vue'
import '../index.css'
import router from './router'
// import './assets/customStyles.css' // just for testing
createApp(App).use(router).mount('#app')
