import axios from 'axios';

export default (interceptors) =>  {
    console.log('import.meta.env.VITE_API_BASE_URL', import.meta.env.VITE_API_BASE_URL);
    const instance = axios.create({
        baseURL: import.meta.env.VITE_API_BASE_URL || interceptors.baseURL || ''
    });

    instance.setAuthorization = (Authorization) => {
        instance.defaults.headers.common['Authorization'] = Authorization;
    };

    // if (interceptors.Authorization) {
    //     instance.setAuthorization(interceptors.Authorization);
    // }

    const requestSuccess = config => {
        // 在 interceptors.js 关闭时间戳注入
        // export const isTimestampDisabled = false;
        if (!interceptors.isTimestampDisabled) {
            injectionTimestamp(config);
        }
        if (interceptors.httpRequestSuccess) {
            return interceptors.httpRequestSuccess(config);
        }
        return config;
    };
    const requestError = error => {
        if (interceptors.httpRequestFailure) {
            return interceptors.httpRequestFailure(error);
        }
        return Promise.reject(error);
    };
    const responseSuccess = response => {
        if (interceptors.httpResponseSuccess) {
            return interceptors.httpResponseSuccess(response.data);
        }
        return response.data;
    };
    const responseError = error => {
        if (interceptors.httpResponseFailure) {
            return interceptors.httpResponseFailure(error);
        }
        return Promise.reject(error);
    };

    instance.interceptors.request.use(requestSuccess, requestError);
    instance.interceptors.response.use(responseSuccess, responseError);

    return instance;
};


/**
 * 在api请求时注入时间戳
 * @param config
 */
function injectionTimestamp(config) {
    const timestamp = new Date().getTime();
    const { params = {} } = config;
    Object.assign(params, {
        timestamp
    });
}
