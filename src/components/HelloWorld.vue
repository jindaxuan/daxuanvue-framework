<!--
 * @Author: your name
 * @Date: 2020-11-11 08:36:32
 * @LastEditTime: 2020-11-23 17:59:48
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /anhuiprovince/src/components/HelloWorld.vue
-->
<template>
    <div class="hello">
        <h1>{{ msg }}</h1>
        <Input v-model="value1" placeholder="Enter something..." style="width: 159px" />
        <Input v-model="value2" placeholder="Enter something..." style="width: 159px" />
        <Input v-model="value3" placeholder="Enter something..." style="width: 159px" />
        <Button @click="logining">登入吧</Button>
    </div>
</template>

<script>
import { Login } from 'api/user'
export default {
    name: 'HelloWorld',
    data() {
        return {
            value1: '郑旭',
            value2: '123456',
            value3: '',
        }
    },
    props: {
        msg: String,
    },
    methods: {
        logining() {
            let json = {
                username: this.value1,
                password: this.value2,
                tenant: 'paas',
            }
            Login(json).then((res) => {
                console.log('res', res)
            })
        },
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
h3 {
    margin: 40px 0 0;
}
ul {
    list-style-type: none;
    padding: 0;
}
li {
    display: inline-block;
    margin: 0 10px;
}
a {
    color: #42b983;
}
</style>
