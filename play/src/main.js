import {
    createApp
} from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import '@sample-vue-element/components/BasicTable/index.scss'

createApp(App).use(ElementPlus).mount('#app')