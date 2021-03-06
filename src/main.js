/*
 * @Author: your name
 * @Date: 2020-11-11 08:36:32
 * @LastEditTime: 2020-11-23 16:45:19
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /anhuiprovince/src/main.js
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store'
// import axios from 'axios'

// 设置了iview的按需引入，可按需要引入相对的组件
import './iview'

// import 'view-design/dist/styles/iview.css';
// import ViewUI from 'view-design';


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
