/*
 * @Author: your name
 * @Date: 2020-11-23 10:58:51
 * @LastEditTime: 2020-11-23 11:25:24
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /anhuiprovince/src/store/store.js
 */
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import mutations from './mutations'
import state from './state'
import actions from './actions';
import getters from './getters';
export default new Vuex.Store({
    state,
    actions,
    mutations,
    getters,
});