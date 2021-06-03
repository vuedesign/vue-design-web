// import './polyfill';
import { createApp } from 'vue';
import Antd from 'ant-design-vue';
import './assets/styles/antd.less';
import { store, router } from './core';
import App from './App.vue';
import Options from './modules/options/index';
import Drop from './modules/drop/index';
import Plugins from './modules/plugins/index';

const app = createApp(App);
app.config.productionTip = false;
app.use(store);
app.use(router);
app.use(Options);
app.use(Antd);
app.use(Drop);
app.use(Plugins);
app.mount('#app');
