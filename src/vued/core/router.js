import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default function(options = {}) {
    const { routes, interceptors, store } = options;
    const mode = options.mode || 'history';
    const router = new Router({
        mode,
        routes
    });

    router.beforeEach((to, from, next) => {
        if (interceptors.routerBeforeEach) {
            interceptors.routerBeforeEach({ store }, { to, from, next });
        } else {
            next();
        }
    });

    router.beforeResolve((to, from, next) => {
        if (interceptors.routerBeforeResolve) {
            interceptors.routerBeforeResolve({ store }, { to, from, next });
        } else {
            next();
        }
    });

    router.afterEach((to, from) => {
        if (interceptors.routerAfterEach) {
            interceptors.routerAfterEach({ store }, { to, from });
        }
    });

    return router;
}
