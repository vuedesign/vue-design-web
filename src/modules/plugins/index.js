const components = import.meta.globEager('./**/*.vue');

// console.log('components=====:::::', components);

export default {
    install: (app) => {
        Object.values(components).forEach(component => {
            // console.log('component=========', app, component);
            app.component(component.default.name, component.default);
        });
    }
};
