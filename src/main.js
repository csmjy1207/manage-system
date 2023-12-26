import Vue from 'vue'
import App from './App.vue'
// 引入router插件
import VueRouter from 'vue-router';
// 导入axios
import axios from 'axios';
//引入echarts
import * as echarts from 'echarts'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'; 
// 引入公共样式
import './assets/css/common.css';

import router from './router'

// 使用插件
Vue.use(VueRouter)

Vue.use(ElementUI);
//vue全局注入echarts
Vue.prototype.$echarts = echarts;
Vue.config.productionTip = false
// 把 axios 挂载到 Vue 原型上
Vue.prototype.$axios = axios;

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
