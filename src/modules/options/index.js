import ConfigRadioGroup from './ConfigRadioGroup';

const components =  {
    'config-radio-group': ConfigRadioGroup
};


export default {
    install: (app, options) => {
        console.log('options', options);
        Object.keys(components).forEach(key => {
            app.component(key, components[key]);
        });
    }
};
