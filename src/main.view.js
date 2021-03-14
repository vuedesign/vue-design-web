
import { createApp } from 'vue';
import { store } from './core';
import Antd from 'ant-design-vue';
import App from './view/App.vue';
import './assets/styles/antd.less';

const app = createApp(App);
app.config.productionTip = false;

app.use(Antd);
app.use(store);

app.mount('#appView');
