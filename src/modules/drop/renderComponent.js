import { h, resolveComponent, defineComponent } from "vue";

export default defineComponent({
    name: 'render-component',
    props: {
        config: {
            type: Object,
            default: () => ({})
        }
    },
    emits:[],
    setup(props) {
        return () => h(resolveComponent('plugin-view'), {
            uuid: props.config.uuid
        }, () => h(resolveComponent(props.config.tag)));
    }
});
