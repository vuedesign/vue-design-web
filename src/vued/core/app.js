import Vue from 'vue';
import { sync } from 'vuex-router-sync';
import createStore from './store';
import createRouter from './router';
import createUtils from './utils';
import createAjax from './ajax';

class App extends Vue {
    constructor(options = {}) {
        const { el, store, mode, routes, App, storePlugins } = options;
        const interceptors = options.interceptors || {};
        const constants = {
            apis: options.apis || {},
            urls: options.urls || {}
        };
        Object.assign(store.state || {}, {
            constants
        });
        Object.assign(store, {
            plugins: storePlugins || []
        });
        const storeInstance = createStore(store);
        const routerInstance = createRouter({
            mode,
            routes: routes || [],
            interceptors,
            store: storeInstance
        });
        sync(storeInstance, routerInstance);

        createUtils(constants);
        createAjax({
            baseURL: '/',
            interceptors,
            store: storeInstance,
            router: routerInstance
        });

        super({
            el: el || '#vue-design-app',
            store: storeInstance,
            router: routerInstance,
            render: h => h(App)
        });
    }
}

export default App;
