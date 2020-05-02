/**
 * 注：vued依赖本文件, 不能删
 */

import { store, router } from 'vue-design-core';
import {
    REQ_SUCCESS_STATUS_CODE
} from './constants';

// let token = 'VHJK324567YU345667POIU';
export const isTimestampDisabled = false;

/**
 * ajax请求成功
 * @param config
 * @returns {*}
 */
export const ajaxRequestSuccess = (config) => {
    const token = store.getters['global/token'];
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`
    }
    return config;
};

/**
 * ajax请求失败
 * @param error
 * @returns {Promise<never>}
 */
export const ajaxRequestFailure = (error) => {
    return Promise.reject(error);
};

/**
 * ajax返回成功
 * @param response
 * @returns {*}
 */
export const ajaxResponseSuccess = (response) => {
    if (response.code === REQ_SUCCESS_STATUS_CODE) {
        return response.data;
    } else {
        router.push({
            name: 'auth-login'
        });
    }
    return Promise.reject(response);
};

/**
 * ajax返回失败
 * @param error
 * @returns {Promise<never>}
 */
export const ajaxResponseFailure = (error) => {
    return Promise.reject(error);
};

export const routerBeforeEach = ({ to, next }) => {
    store.commit('global/BREADCRUMB', to);
    next();
};

export const routerBeforeResolve = ({ next }) => {
    next();
};

export const routerAfterEach = () => {};
