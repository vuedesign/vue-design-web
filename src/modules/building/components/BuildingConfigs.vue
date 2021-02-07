<template>
    <a-layout-sider
        class="building-configs"
        theme="light"
        width="241px"
    >
        <component :is="`${currentToolBar}Configs`" />
    </a-layout-sider>
</template>

<script>
import { useCurrentToolBar } from '../services/toolBar';
import ComponentConfigs from '../children/component/components/ComponentConfigs';

export default {
    name: 'building-configs',
    components: {
        ComponentConfigs
    },
    setup() {
        const { currentToolBar } = useCurrentToolBar();

        return {
            currentToolBar
        };
    }
};
</script>

<style lang="scss" scoped>
.building-configs {
    background-color: #fff;
    border-left: 1px solid #d6dfe7;
}
</style>
