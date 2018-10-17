/**
 * Created by n.see on 2018/10/25.
 */
import axios from 'axios';

const ajax = (options = {}) => {
    const { store, baseURL } = options;
    const interceptors = options.interceptors || {};
    const instance = axios.create({
        baseURL
    });
    instance.interceptors.request.use(config => {
        // 在 interceptors.js 关闭时间戳注入
        // export const isTimestampDisabled = false;
        if (!interceptors.isTimestampDisabled) {
            injectionTimestamp(config);
        }
        if (interceptors.ajaxRequestSuccess) {
            return interceptors.ajaxRequestSuccess({ store }, config);
        }
        return config;
    }, error => {
        if (interceptors.ajaxRequestFailure) {
            return interceptors.ajaxRequestFailure({ store }, error);
        }
        return Promise.reject(error);
    });

    instance.interceptors.response.use(response => {
        if (interceptors.ajaxResponseSuccess) {
            return interceptors.ajaxResponseSuccess({ store }, response.data);
        }
        return response.data;
    }, error => {
        if (interceptors.ajaxResponseFailure) {
            return interceptors.ajaxResponseFailure({ store }, error);
        }
        return Promise.reject(error);
    });

    return instance;
};

/**
 * 在api请求时注入时间戳
 * @param config
 */
function injectionTimestamp(config) {
    const timestamp = new Date().getTime();
    if (config.params) {
        config.params = Object.assign({}, config.params, {
            timestamp
        });
    } else {
        config.params = {
            timestamp
        };
    }
}

const install = (Vue, options) => {
    Vue.prototype.$ajax = ajax(options);
    Vue.ajax = ajax(options);
};

export default {
    install
};
