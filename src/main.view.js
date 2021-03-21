
import { createApp } from 'vue';
import { store } from './core';
import Antd from 'ant-design-vue';
import App from './view/App.vue';
import './assets/styles/antd.less';
import drop from './modules/drop/index';

const app = createApp(App);
app.config.productionTip = false;

app.use(Antd);
app.use(store);
app.use(drop);

app.mount('#appView');
