import { h, resolveComponent, defineComponent } from 'vue';


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
    setup(props) {
        return () => h(resolveComponent(props.config.tag), {
            config: props.config,
            ...parseProps(props.config.props)
        }, () => parseText(props.config.text));
    }
});
