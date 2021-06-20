<template>
    <a-layout-sider
        class="layout-configs"
        theme="light"
        width="241px"
    >
        <workbench-config />
    </a-layout-sider>
</template>

<script>
import { defineComponent, computed } from 'vue';
import { useStore } from 'vuex';
import WorkbenchConfig from '../children/config/Index.vue';

export default defineComponent({
    name: 'layout-configs',
    components: {
        WorkbenchConfig
    },
    setup() {
        const store = useStore();
        const currentComponentStyle = computed(() => store.getters['workbench/currentComponentStyle']);
        const handleClick = () => {
            store.commit('workbench/UPDATE_CURRENT_COMPONENT_STYLE', {
                width: '100%',
                left: currentComponentStyle.value.left + 1
            });
        };
        return {
            currentComponentStyle,
            handleClick
        };
    }
});
</script>

<style lang="scss" scoped>
.layout-configs {
    background-color: #fff;
    border-left: 1px solid #d6dfe7;
}
</style>
