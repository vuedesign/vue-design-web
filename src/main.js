
import { createApp } from 'vue';
import Antd from 'ant-design-vue';
import './assets/styles/antd.less';
import { store, router } from './core';
import App from './App.vue';
import Options from './modules/options/index';
import drop from './modules/drop/index';

const app = createApp(App);
app.config.productionTip = false;

app.use(Antd);
app.use(store);
app.use(router);
app.use(Options);
app.use(drop);

app.mount('#app');
