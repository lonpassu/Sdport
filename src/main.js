import { createApp } from 'vue'
// import './style.css'
import './assets/css/reset.scss'
import App from './App.vue'
import router from './router/index.js'
//全局挂载echarts
import * as echarts from 'echarts';
//全局挂载ElementPlus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

const app = createApp(App);
// vue3 给原型上挂载属性 
app.config.globalProperties.$echarts = echarts;
app.use(ElementPlus)
app.use(router).mount('#app');
