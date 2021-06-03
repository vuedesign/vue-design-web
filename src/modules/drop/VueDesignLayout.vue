<template>
    <div
        class="vue-design-layout"
        :style="viewStyle"
    >
        <slot />
    </div>
</template>

<script>
import { computed, defineComponent, reactive } from 'vue';

export default defineComponent({
    name: 'vue-design-layout',
    props: {
        style: {
            type: Object,
            default: (style) => {
                console.log('ddddd=========', style);
                const width = 100;
                const height = 100;
                const left = width / 2;
                const top = height / 2;
                return ({
                    display: 'block',
                    position: 'relative',
                    width,
                    height,
                    left,
                    top
                });
            }
        }
    },
    setup(props) {
        const defaultStyle = reactive(props.style);

        const viewStyle = computed(() => {
            return {
                display: defaultStyle.display,
                position: defaultStyle.position,
                width: `${defaultStyle.width}px`,
                height: `${defaultStyle.height}px`,
                left: `${defaultStyle.left}px`,
                top: `${defaultStyle.top}px`,
                backgroundColor: 'red'
            };
        });

        return {
            defaultStyle,
            viewStyle
        };
    }
});
</script>

<style lang="scss" scoped>
.vue-design-layout {
    position: relative;
    z-index: 100;
    -webkit-user-drag: none;
    background-color: transparent;
    border: 1px solid #eee;
    cursor: move;
}
</style>
