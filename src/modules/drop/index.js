import PluginDropHandler from './PluginDropHandler.vue';
import PluginDropView from './PluginDropView.vue';
import PluginDropOptions from './PluginDropOptions.vue';
import PluginDropHandlerList from './PluginDropHandlerList.vue';

const components =  {
    'plugin-drop-handler': PluginDropHandler,
    'plugin-drop-handler-list': PluginDropHandlerList,
    'plugin-drop-view': PluginDropView,
    'plugin-drop-options': PluginDropOptions
};

export default {
    install: (app) => {
        Object.keys(components).forEach(key => {
            app.component(key, components[key]);
        });
    }
};
