import store from './store';
import router from './router';
import createHttp from './http';
import interceptors from './interceptors';

const http = createHttp(interceptors);
require('@configs/interceptors');

export {
    store,
    router,
    http
};
