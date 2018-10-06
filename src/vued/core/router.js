import Vue from 'vue';
import Router from 'vue-router';
import defaultInterceptors from './interceptors';
Vue.use(Router);

export default function(options = {}) {
    const { routes } = options;
    const mode = options.mode || 'history';
    const Interceptors = options.Interceptors;
    const interceptors = new Interceptors();
    const routerBeforeEach = interceptors.routerBeforeEach || defaultInterceptors.routerBeforeEach;
    const routerBeforeResolve = interceptors.routerBeforeResolve || defaultInterceptors.routerBeforeResolve;
    const routerAfterEach = interceptors.routerAfterEach || defaultInterceptors.routerAfterEach;
    const router = new Router({
        mode,
        routes
    });
    router.beforeEach(routerBeforeEach.bind(interceptors));
    router.beforeResolve(routerBeforeResolve.bind(interceptors));
    router.afterEach(routerAfterEach.bind(interceptors));
    return router;
}
