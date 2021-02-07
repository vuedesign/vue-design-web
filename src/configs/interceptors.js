import { router, store, http } from '@core';
import { SUCCESS_STATUS_CODE } from './constants';
import {
    onGlobalConfig,
    onHttpRequestSuccess,
    onHttpRequestFailure,
    onHttpResponseSuccess,
    onHttpResponseFailure,
    onRouterBeforeEach,
    onRouterAfterEach,
    onRouterBeforeResolve
} from '@core/interceptors';
// import { onMounted } from 'vue';

// 拦截器配置
onGlobalConfig(config => {
    // 时间戳注入开关
    config.isTimestampDisabled = false;
    const token = store.getters['globals/token'];
    if (token) {
        http.setAuthorization(`Bearer ${token}`);
    }
});

// 请求成功
onHttpRequestSuccess(config => config);

// 请求失败
onHttpRequestFailure(error => Promise.reject(error));

// 返回成功
onHttpResponseSuccess((response) => {
    if (response.retcode === SUCCESS_STATUS_CODE) {
        return response.data;
    } else if (response.retcode === 1 && response.data.status === 401) {
        router.push({
            name: 'login'
        });
        return;
    }
    return Promise.reject(response);
});

// 返回失败
onHttpResponseFailure(error => Promise.reject(error));

// 路由进入之前
onRouterBeforeEach(({ to, next }) => {
    // debugger;
    store.commit('globals/SEO_TITLE', to);
    next();
});

// 路由进入之后
onRouterAfterEach(() => {});

onRouterBeforeResolve(({ next }) => {
    next();
});
