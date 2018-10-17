/**
 * Created by wujian on 2018/9/24.
 */

let token = 'VHJK324567YU345667POIU';

/**
 * ajax请求成功
 * @param store
 * @param router
 * @param config
 * @returns {*}
 */
export const ajaxRequestSuccess = ({ store, router }, config) => {
    console.log('store:', store);
    console.log('router:', router);
    return config;
};

/**
 * ajax请求失败
 * @param store
 * @param router
 * @param error
 * @returns {Promise<never>}
 */
export const ajaxRequestFailure = ({ store, router }, error) => {
    return Promise.reject(error);
};

/**
 * ajax返回成功
 * @param store
 * @param router
 * @param response
 * @returns {*}
 */
export const ajaxResponseSuccess = ({ store, router }, response) => {
    return response.data;
};

/**
 * ajax返回失败
 * @param store
 * @param router
 * @param error
 * @returns {Promise<never>}
 */
export const ajaxResponseFailure = ({ store, router }, error) => {
    return Promise.reject(error);
};

export const routerBeforeEach = ({ store }, { to, from, next }) => {
    console.log('routerBeforeEach', to, from);
    console.log('token:', token);
    next();
};

export const routerBeforeResolve = ({ store }, { to, from, next }) => {
    next();
};

export const routerAfterEach = ({ store }, { to, from }) => {
    console.log(store);
};
