<script>
import { defineComponent, resolveComponent, h } from 'vue';
import config from './config.json';

export default defineComponent({
    name: config.tag,
    props: {
        name: {
            type: String,
            default: 'angry'
        },
        size: {
            type: String,
            default: '14px'
        },
        color: {
            type: String,
            default: '#333'
        },
        config: {
            type: Object,
            default: () => ({})
        }
    },
    setup(props) {
        return () => h(
            resolveComponent('plugin-view'),
            props,
            () => h(
                resolveComponent('font-awesome'),
                props
            )
        );
    }
});
</script>

<style lang="scss">
.plugin-button {
    height: 100%;
    width: 100%;
    -webkit-user-drag: none;
}
</style>
