

// 去除console.log
const TerserPlugin = require('terser-webpack-plugin')

// 引入gzip压缩
const CompressionWebpackPlugin = require('compression-webpack-plugin')

const productionGzipExtensions = ['js', 'css']

const path = require('path')

// let glob = require('glob')

// 给当前环境变量附值
const env = process.env.NODE_ENV


function resolve(dir) {
    return path.join(__dirname, dir) //path.join(_dirname)设置绝对路径
}
module.exports = {
    // 修改webpack的配置
    configureWebpack: config => {
      // 方便cdn引入，不需要在main.js中再次引入了
        config.externals = {
            axios: 'axios',
            'vue-router': 'VueRouter',
            vuex: 'Vuex',
            'vue-i18n': 'VueI18n',
            echarts: 'echarts',
            AMap: 'AMap', // 高德地图配置
            jquery: '$'
        }
        if (process.env.NODE_ENV === 'production') {
            config.externals.vue = 'Vue'
        }
        if (env !== 'development') {
            //生产
            config.plugins.push(
                new CompressionWebpackPlugin({
                    algorithm: 'gzip',
                    test: new RegExp(`\\.(${productionGzipExtensions.join('|')})$`),
                    threshold: 10240,   // 对超过10kb的数据进行压缩
                    minRatio: 0.8    // 只有压缩率小于这个值的资源才会被处理
                })
            )
            config.plugins.push(
                new TerserPlugin({
                    terserOptions: {
                        compress: {
                            drop_debugger: true, // console
                            drop_console: true,
                            pure_funcs: ['console.log'] // 移除console
                        }
                    },
                    sourceMap: false,
                    parallel: true
                })
            )

            // config.plugins.push(
            //     new BundleAnalyzerPlugin()
            // )
        } else if (env === 'development') {
            //开发
        }
    },
    //压缩图片
    chainWebpack: config => {
        // 配置别名
        config.resolve.alias
        .set('@', resolve('src'))
        .set('assets', resolve('src/assets'))
        .set('components', resolve('src/components'))
        .set('views', resolve('src/views'))


        /* 添加分析工具*/
        if (process.env.NODE_ENV === 'production') {
            if (process.env.npm_config_report) {
                config
                    .plugin('webpack-bundle-analyzer')
                    .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
                    .end()
                config.plugins.delete('prefetch')
            }
        }

        config.module
            .rule('svg')
            .exclude.add(path.resolve('./src/assets/icons/svg'))
            .end()

        config.module
            .rule('assets')
            .test(/\.svg$/)
            .include.add(path.resolve('./src/assets/icons/svg'))
            .end()
            .use('svg-sprite-loader')
            .loader('svg-sprite-loader')
            .options({
                symbolId: 'icon-[name]'
            })
            .end()

            // // 这里是对环境的配置，不同环境对应不同的BASE_URL，以便axios的请求地址不同
            // config.plugin('define').tap(args => {
            //     //axios、代码、中的BASE_URL根据页面地址获取
            //     args[0]['process.env'].BASE_URL =
            //         env === 'development' ? JSON.stringify('/web') : JSON.stringify()
            //     // args[0]['process.env'].BASE_URL = JSON.stringify(process.env.BASE_URL)
            //     return args
            // })

        config.resolve.alias
            //第一个参数：别名 第二个参数：路径
            .set('components', resolve('src/components'))
            .set('api', resolve('src/api'))
            .set('mixins', resolve('src/mixins'))
            .set('@views', resolve('src/views'))
            .set('@opViews', resolve('src/OperaViews'))
            .set('@modules', resolve('src/modules'))

        config.module
            .rule('images')
            .use('url-loader')
            .loader('url-loader')
            .tap(options => {
                // 修改它的选项...
                options.limit = 100
                return options
            })
    },
    devServer: {
        port: 8899, //设置端口号
        proxy: {
            '^/web/': {
                target: '', // 开发3
                ws: false,
                pathRewrite: {
                    '^/web': ''
                },
                changeOrigin: false // 设置同源  默认false，是否需要改变原始主机头为目标URL,
            }
        }
    }
}