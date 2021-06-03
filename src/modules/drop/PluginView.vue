<template>
    <div
        class="plugin-view"
        :class="classNames"
        @click="handlerSelect"
    >
        <slot />
        <div class="plugin-view-line plugin-view-line--top"></div>
        <div class="plugin-view-line plugin-view-line--right"></div>
        <div class="plugin-view-line plugin-view-line--bottom"></div>
        <div class="plugin-view-line plugin-view-line--left"></div>
    </div>
</template>

<script>
import { computed, defineComponent } from 'vue';

export default defineComponent({
    name: 'plugin-view',
    props: {
        name: {
            type: String,
            default: ''
        }
    },
    emits: ['select'],
    setup(props, { emit }) {

        const classNames = computed(() => {
            return `plugin-view--${props.name}`;
        });
        const handlerSelect = (ev) => {
            emit('select', ev);
        };

        return {
            classNames,
            handlerSelect
        };
    }
});
</script>

<style lang="scss" scoped>
.plugin-view {
    position: absolute;
    z-index: 100;
    -webkit-user-drag: none;
    background-color: rgba(red, .3);

    .plugin-view {
        background-color: red;
        position: absolute;
        -webkit-user-drag: none;
        pointer-events: none;
    }

    .plugin-view-line--top {
        top: 0;
        left: 4px;
        right: 4px;
        height: 1px;
    }

    .plugin-view-line--right {
        top: 4px;
        bottom: 4px;
        right: 0;
        width: 1px;
    }

    .plugin-view-line--bottom {
        bottom: 0;
        left: 4px;
        right: 4px;
        height: 1px;
    }

    .plugin-view-line--left {
        top: 4px;
        bottom: 4px;
        left: 0;
        width: 1px;
    }
}
</style>
