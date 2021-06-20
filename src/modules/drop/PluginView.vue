<template>
    <div
        class="plugin-view"
        :class="classNames"
        :data-uuid="config.uuid"
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
import { useStore } from 'vuex';


export default defineComponent({
    name: 'plugin-view',
    props: {
        config: {
            type: Object,
            default: () => ({
                name: ''
            })
        }
    },
    setup(props) {
        const store = useStore();

        const currentUuid = computed(() => store.getters['workbench/currentUuid']);
        const classNames = computed(() => {
            let cns = [`plugin-view-${props.config.name}`];
            if (currentUuid.value === props.config.uuid) {
                cns.push(`active`);
            }
            return cns.join(' ');
        });

        return {
            classNames
        };
    }
});
</script>

<style lang="scss" scoped>
.plugin-view {
    position: relative;
    .plugin-view-line {
        position: absolute;
        background-color: #ff00f7;
        display: none;
    }

    &.active {
        > .plugin-view-line {
            display: block;
        }
    }
}

.plugin-view-line--top {
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
}

.plugin-view-line--right {
    top: 0;
    bottom: 0;
    right: 0;
    width: 1px;
}

.plugin-view-line--bottom {
    bottom: 0;
    left: 0;
    right: 0;
    height: 1px;
}

.plugin-view-line--left {
    top: 0;
    bottom: 0;
    left: 0;
    width: 1px;
}
</style>
