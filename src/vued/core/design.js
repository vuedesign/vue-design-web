import Vue from 'vue';

let Design = {
    name: 'VueDesign',
    version: '__VERSION__'
};

Design.plugins = (pluginsPath) => {
    loadFile(pluginsPath, []).forEach(plugin => {
        const { name, options = {} } = plugin;
        Vue.use(plugin[name], options);
    });
};

Design.filters = (filtersPath) => {
    const filters = loadFile(filtersPath, {});
    Object.keys(filters).forEach(key => {
        Vue.filter(key, filters[key]);
    });
};

Design.directives = (directivesPath) => {
    const directives = loadFile(directivesPath, {});
    Object.keys(directives).forEach(key => {
        Vue.filter(key, directives[key]);
    });
};

Design.mixin = (mixinPath) => {
    Vue.mixin(loadFile(mixinPath, {}));
};

Design.use = (plugin, options = {}) => {
    Vue.use(plugin, options);
    return Design;
};

function loadFile(path, defaultValue) {
    if (!path) {
        return defaultValue;
    }
    if (typeof path === 'string') {
        const newPath = path.replace('@/', '');
        const moduleData = require(`@/${newPath}`);
        return 'default' in moduleData ? moduleData.default : moduleData;
    }
    return path || defaultValue;
}

export default Design;
