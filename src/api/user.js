/*
 * @Author: your name
 * @Date: 2020-11-23 14:48:16
 * @LastEditTime: 2020-11-23 17:35:02
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /anhuiprovince/src/api/user.js
 */

import $axios from './index'

export function Login(data = {}) {
    return $axios.request({
        url: '/paas/login',
        method: 'post',
        data: data,
        headers: {
            'Content-type': 'application/json'
        }
    })
}
