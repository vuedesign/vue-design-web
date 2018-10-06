/**
 * Created by wujian on 2018/9/24.
 */
import { getAPI, getURL } from '../global/helpers';

const Utils = {};

Utils.install = (Vue, options = {}) => {
    const apis = options.apis || {};
    Vue.prototype.$getAPI = (type, payload) => {
        return getAPI(apis, type, payload);
    };
    Vue.getAPI = (type, payload) => {
        return getAPI(apis, type, payload);
    };

    const urls = options.urls || {};
    Vue.prototype.$getURL = (type, payload) => {
        return getURL(urls || {}, type, payload);
    };
    Vue.getURL = (type, payload) => {
        return getURL(urls, type, payload);
    };
};

export default Utils;
