<template>
    <div class="plugin-drop-options" :class="className">
        <slot />
    </div>
</template>

<script>
import { defineComponent, computed } from 'vue';

export default defineComponent({
    name: 'plugin-drop-options',
    props: {
        name: {
            type: String,
            required: true
        }
    },
    setup(props) {
        const className = computed(() => `plugin-drop-options-${props.name}`);

        return {
            className
        };
    }
});
</script>

<style lang="scss" scoped>
.plugin-drop-options {
    position: relative;
    -webkit-user-drag: none;
}
</style>
