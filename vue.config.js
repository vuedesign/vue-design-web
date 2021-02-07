const path = require('path');

function resolve(dir) {
    return path.join(__dirname, dir);
}

module.exports = {
    devServer: {
        overlay: {
            warnings: true,
            errors: true
        },
        open: true,
        proxy: {
            '/api': {
                target: 'http://127.0.0.1:8082', //跨域网址
                secure: true, // 如果是https接口，需要配置这个参数
                changeOrigin: true, //自动修改http header里面的host
                pathRewrite: {
                    '^/api': '/api', //路径的替换规则
                }
            }
        }
    },
    lintOnSave: process.env.NODE_ENV !== 'production',
    configureWebpack: {
        resolve: {
            extensions: ['.js', '.vue', '.json', '.less'],
            alias: {
                '@': resolve('src'),
                '@modules': resolve('src/modules'),
                '@configs': resolve('src/configs'),
                '@assets': resolve('src/assets'),
                '@core': resolve('src/core')
            }
        }
    },
    css: {
        loaderOptions: {
            less: {
                lessOptions:{
                    javascriptEnabled: true,
                }
            }
        }
    }
};
