import app from './core/app';
import Design from './core/design';
import to from './core/to';
import { sync } from 'vuex-router-sync';
import createStore from './core/store';
import createRouter from './core/router';
import initAjax from './core/ajax';
import { createAjax } from './plugins/ajax';

// 导入路由配置
import configRoutes from '@/configs/routes';
// 导入拦截器，路由与ajax
import * as interceptors from '@/configs/interceptors';
// 导入vuex状态管理

import modules from '@/configs/modules';

const store = createStore({ modules });

const router = createRouter({
    mode: 'history',
    routes: configRoutes || [],
    interceptors
});

const ajax = createAjax({
    baseURL: '/',
    interceptors
});

sync(store, router);

initAjax({
    baseURL: '/',
    interceptors
});

console.log('Design ================= ', Design);
Design.extend = app({ store, router });

export { to, store, router, ajax };
export default Design;
