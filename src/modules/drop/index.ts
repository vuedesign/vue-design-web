const components = import.meta.globEager('./*.(vue|js|ts)');

export default {
    install: (app) => {
        Object.values(components).forEach(component => {
            console.log('component', component);
            app.component(component.default.name, component.default);
        });
    }
};
