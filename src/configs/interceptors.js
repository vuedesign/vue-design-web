import { injectionTimestamp } from '../vued';

/**
 * Created by wujian on 2018/9/24.
 */

class Interceptors {
    constructor() {
        this.token = 'xxsdfsf';
    }

    ajaxRequestSuccess(config) {
        injectionTimestamp(config);
        return config;
    }

    ajaxRequestFailure(error) {
        return Promise.reject(error);
    }

    ajaxResponseSuccess(response) {
        return response.data;
    }

    ajaxResponseFailure(error) {
        return Promise.reject(error);
    }
    routerBeforeEach(to, from, next) {
        console.log('routerBeforeEach', to, from);
        console.log('Interceptors', this.token, this);
        next();
    }

    routerBeforeResolve(to, from, next) {
        next();
    }

    routerAfterEach(to, from) {
    }
}

export default Interceptors;
