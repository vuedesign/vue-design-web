
import { createApp } from 'vue';
import { store, router } from './core';
import Antd from 'ant-design-vue';
import App from './App.vue';
import './assets/styles/antd.less';
import { createFromIconfontCN } from '@ant-design/icons-vue';

const Iconfont = createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/font_923223_jcdq4lk7j1.js'
});

const app = createApp(App);
app.config.productionTip = false;

app.use(Antd);
app.use(store);
app.use(router);
app.component(Iconfont.name, Iconfont);

app.mount('#app');
