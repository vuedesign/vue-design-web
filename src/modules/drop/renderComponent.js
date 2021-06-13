import { h, resolveComponent, defineComponent } from "vue";


function parseProps(props) {
    const _props = {};
    for(let key in props) {
        _props[key] = props[key].default;
    }
    return _props;
}

function parseText(text) {
    return text.default;
}

export default defineComponent({
    name: 'render-component',
    props: {
        config: {
            type: Object,
            default: () => ({})
        }
    },
    emits:[],
    render(context) {
        const config = context.$props.config;
        console.log('config', config);
        return h(resolveComponent(config.tag), {
            config,
            ...parseProps(config.props)
        }, () => parseText(config.text));
    }
});
