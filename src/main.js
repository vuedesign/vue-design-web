import VueDesign from '@/vued';
// 导入组入口
import App from '@/App';

VueDesign.use('@/vendor/UIComponent');
VueDesign.mixin('@/vendor/mixin');
VueDesign.plugins('@/vendor/plugins');
VueDesign.filters('@/vendor/filters');
VueDesign.directives('@/vendor/directives');
VueDesign.components('@/vendor/components');

VueDesign.extend({
    App
}).$mount('#vue-design-app');
