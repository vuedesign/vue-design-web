
import { createApp } from 'vue';
import { store, router } from './core';
import Antd from 'ant-design-vue';
import App from './App.vue';
import './assets/styles/antd.less';
import Options from './modules/options/index';

const app = createApp(App);
app.config.productionTip = false;

app.use(Antd);
app.use(store);
app.use(router);
app.use(Options);

app.mount('#app');
