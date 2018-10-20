import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default function(options = {}) {
    const { routes } = options;
    const mode = options.mode || 'history';
    const interceptors = options.interceptors || {};
    const router = new Router({
        mode,
        routes
    });

    router.beforeEach((to, from, next) => {
        if (interceptors.routerBeforeEach) {
            interceptors.routerBeforeEach({ to, from, next });
        } else {
            next();
        }
    });

    router.beforeResolve((to, from, next) => {
        if (interceptors.routerBeforeResolve) {
            interceptors.routerBeforeResolve({ to, from, next });
        } else {
            next();
        }
    });

    router.afterEach((to, from) => {
        if (interceptors.routerAfterEach) {
            interceptors.routerAfterEach({ to, from });
        }
    });

    return router;
}
