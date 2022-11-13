import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import {io} from "socket.io-client"

const socket = io('http://localhost:3000'); 
console.log(socket)

createApp(App).use(store).use(router).mount('#app')
