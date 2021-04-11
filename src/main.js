
import { createApp } from 'vue';
import Antd from 'ant-design-vue';
import './assets/styles/antd.less';
import { store, router } from './core';
import App from './App.vue';
import Options from './modules/options/index';
import drop from './modules/drop/index';

window['app'] = createApp(App);
window.__store__ = store;
window.__app__ = window.app;
window.app.config.productionTip = false;

window.app.use(Antd);
window.app.use(store);
window.app.use(router);
window.app.use(Options);
window.app.use(drop);

window.app.mount('#app');
