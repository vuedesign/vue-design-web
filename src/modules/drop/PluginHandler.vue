<template>
    <div
        class="plugin-handler"
        :class="classNames"
    >
        <slot />
    </div>
</template>

<script>
import { computed, defineComponent } from 'vue';

export default defineComponent({
    name: 'plugin-handler',
    props: {
        name: {
            type: String,
            default: ''
        }
    },
    setup(props) {

        const classNames = computed(() => {
            return `plugin-${props.name}--handler`;
        });
        return {
            classNames
        };
    }
});
</script>

<style lang="scss" scoped>
.plugin-handler {
    -webkit-user-drag: none;
    width: 100px;
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
