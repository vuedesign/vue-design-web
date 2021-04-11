import './global.design.js';
import { createApp } from 'vue';
import Antd from 'ant-design-vue';
// import { getCurrentInstance } from 'vue';
import DesignApp from './DesignApp.vue';
import './assets/styles/antd.less';
import drop from './modules/drop/index';

window.app = createApp(DesignApp);
window.app.use(window.store);
window.app.use(Antd);
window.app.use(drop);
window.app.mount('#design');
