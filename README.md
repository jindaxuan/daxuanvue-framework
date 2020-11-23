<!--
 * @Author: your name
 * @Date: 2020-11-11 08:36:40
 * @LastEditTime: 2020-11-23 13:51:28
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /anhuiprovince/README.md
-->
# Daxuan-Vue-Framework

## Project setup 下载依赖
```
yarn install
```

### Compiles and hot-reloads for development  运行
```
yarn dev
```

### Compiles and minifies for production  打包
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration

### 项目介绍
    基于vue-cli4脚手架搭建
    core.js  //支持es6
    less（为什么用less，环境更友好，用sass可能会遇到node-sass安装不成功问题）
    eslint（基本的）
    vuex（基本的）
    vue-router（基本的）
    采用了history模式 
    UI组件使用iview4.0以后版本view-design并采用按需引入的方式引入对应的项目
    采用了cdn引入依赖的方式，减少项目打包体积
    采用了gzip压缩
    采用了图片超过1024kb压缩
    安装了vue-lazyload懒加载插件
    src目录下的tool文件中添加了一些常用的工具类函数（uuid，节流防抖，时间格式化，手机号校验...）
    采用了terser-webpack-plugin插件，对生产中对console.log进行移除
    格式化采用vscode的prettier插件，配置文件在.prettierc.json中
    引入了lockr插件，方便把一些数据存到localstorage中
    


