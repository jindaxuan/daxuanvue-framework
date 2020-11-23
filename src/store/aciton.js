/*
 * @Author: your name
 * @Date: 2020-11-23 10:51:36
 * @LastEditTime: 2020-11-23 11:19:33
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /anhuiprovince/src/store/aciton.js
 */
export default {
    //actions和之前讲的Mutations功能基本一样，不同点是，actions是异步的改变state状态，而Mutations是同步改变状态
    addAction(context){
      context.commit('add',10)
    },
    addESstationName(mutations,data){
      mutations.commit('saveESstationName',data)
    } 
  }
  