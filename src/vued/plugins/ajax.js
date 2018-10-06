/**
 * Created by wujian on 2018/3/25.
 */
import axios from 'axios';
import defaultInterceptors from '../core/interceptors';
let Ajax = {};

const ajax = (options) => {
    options = options || {};
    const baseURL = options.baseURL || '';
    const Interceptors = options.Interceptors;
    const interceptors = new Interceptors();
    const requestSuccess = interceptors.ajaxRequestSuccess || defaultInterceptors.ajaxRequestSuccess;
    const requestFailure = interceptors.ajaxRequestFailure || defaultInterceptors.ajaxRequestFailure;
    const responseSuccess = interceptors.ajaxResponseSuccess || defaultInterceptors.ajaxRequestSuccess;
    const responseFailure = interceptors.ajaxResponseFailure || defaultInterceptors.ajaxResponseFailure;
    const instance = axios.create({
        baseURL
    });
    instance.interceptors.request.use(requestSuccess.bind(interceptors), requestFailure.bind(interceptors));
    instance.interceptors.response.use(responseSuccess.bind(interceptors), responseFailure.bind(interceptors));

    return instance;
};

Ajax.install = (Vue, options) => {
    Vue.prototype.$ajax = ajax(options);
    Vue.ajax = ajax(options);
};

export default Ajax;
