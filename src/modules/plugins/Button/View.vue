<script>
import { defineComponent, resolveComponent, h } from 'vue';
import config from './config.json';
import { Button } from 'ant-design-vue';

export default defineComponent({
    name: config.tag,
    props: {
        ...Button.props,
        config: {
            type: Object,
            default: () => ({})
        }
    },
    setup(props, context) {
        return () => h(resolveComponent('plugin-view'), {
            name: config.name,
            'data-uuid': props.config.uuid
        }, () => [
            h(
                resolveComponent('a-button'),
                props,
                context.slots
            ),
            h('div', {
                class: 'plugin-view-button-mark'
            })
        ]);
    }
});
</script>

<style lang="scss">
.plugin-view-button {
    width: min-content;
    height: min-content;
}
.plugin-view-button-mark {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 2;
}
</style>
