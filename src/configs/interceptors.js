/**
 * Created by wujian on 2018/9/24.
 */

let token = 'xxsdfsf';

export const ajaxRequestSuccess = ({ store }, config) => {
    return config;
};

export const ajaxRequestFailure = ({ store }, error) => {
    return Promise.reject(error);
};

export const ajaxResponseSuccess = ({ store }, response) => {
    return response.data;
};

export const ajaxResponseFailure = ({ store }, error) => {
    return Promise.reject(error);
};

export const routerBeforeEach = ({ store }, { to, from, next }) => {
    console.log('routerBeforeEach', to, from);
    console.log('Interceptors', token);
    next();
};

export const routerBeforeResolve = ({ store }, { to, from, next }) => {
    next();
};

export const routerAfterEach = ({ store }, { to, from }) => {
    console.log(store);
};
