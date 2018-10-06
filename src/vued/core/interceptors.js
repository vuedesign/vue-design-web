/**
 * Created by wujian on 2018/9/24.
 */
import { injectionTimestamp } from '../global/utils';
export default {
    ajaxRequestSuccess: (config) => {
        injectionTimestamp(config);
        return config;
    },
    ajaxRequestFailure: (error) => {
        return Promise.reject(error);
    },
    ajaxResponseSuccess: (response) => {
        return response.data;
    },
    ajaxResponseFailure: (error) => {
        return Promise.reject(error);
    },
    routerBeforeEach: (to, from, next) => {
        next();
    },
    routerBeforeResolve: (to, from, next) => {
        next();
    },
    routerAfterEach: (to, from) => {
    }
};
