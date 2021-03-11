import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import viteESLint from '@ehutch79/vite-eslint';

function resolve(dir) {
    return path.join(__dirname, dir);
}

// https://vitejs.dev/config/
export default defineConfig({
    server: {
        open: '/',
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
    resolve: {
        // extensions: ['.js', '.vue', '.json', '.less'],
        alias: {
            '@': resolve('src'),
            '@modules': resolve('src/modules'),
            '@configs': resolve('src/configs'),
            '@assets': resolve('src/assets'),
            '@core': resolve('src/core')
        }
    },
    plugins: [vue(), viteESLint({ 'include': ['src/**/*.vue', 'src/**/*.js'] })]
});
