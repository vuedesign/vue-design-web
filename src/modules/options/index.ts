import ConfigRadioGroup from './ConfigRadioGroup.vue';

const components =  {
    'config-radio-group': ConfigRadioGroup
};

export default {
    install: (app) => {
        Object.keys(components).forEach(key => {
            app.component(key, components[key]);
        });
    }
};
