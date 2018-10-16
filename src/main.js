import VueDesign from './vued';
// 导入组入口
import App from '@/App';
// 导入路由配置
import routes from '@/configs/routes';
// 导入拦截器，路由与ajax
import Interceptors from '@/configs/interceptors';
// 导入vuex状态管理
import store from '@/store';
import modules from '@/configs/modules';
// 导入api常量
import * as apis from '@/configs/apis';
// 导入url常量
import * as urls from '@/configs/urls';

VueDesign.use('@/vendor/UIComponent');

VueDesign.mixin('@/vendor/mixin');
VueDesign.plugins('@/vendor/plugins');
VueDesign.filters('@/vendor/filters');
VueDesign.directives('@/vendor/directives');
VueDesign.components('@/vendor/components');

// 导入vuex状态管理的子模块
Object.assign(store, { modules });

/* eslint-disable no-new */
new VueDesign.App({
    App,
    routes,
    Interceptors,
    store,
    apis,
    urls
});
