<template>
    <div
        class="plugin-options"
        :class="classNames"
    >
        <slot />
    </div>
</template>

<script>
import { computed, defineComponent } from 'vue';

export default defineComponent({
    name: 'plugin-options',
    props: {
        name: {
            type: String,
            default: ''
        }
    },
    setup(props) {

        const classNames = computed(() => {
            return `plugin-${props.name}-options`;
        });
        return {
            classNames
        };
    }
});
</script>

<style lang="scss" scoped>
.plugin-options {
    -webkit-user-drag: none;
}
</style>
