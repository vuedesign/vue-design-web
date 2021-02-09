<template>
    <a-layout-sider
        class="building-tools"
        theme="light"
        width="241px"
    >
        <component :is="`${currentToolBar}Tools`" />
    </a-layout-sider>
</template>

<script>
import { useCurrentToolBar } from '../services/toolBar';
import ComponentTools from '../children/component/components/ComponentTools';
import IconTools from '../children/icon/components/IconTools';
import MaterialTools from '../children/material/components/MaterialTools';
import PageTools from '../children/page/components/PageTools';

export default {
    name: 'building-tools',
    components: {
        ComponentTools,
        IconTools,
        MaterialTools,
        PageTools
    },
    setup() {
        const { currentToolBar } = useCurrentToolBar();

        return {
            currentToolBar
        };
    }
};
</script>

<style scoped lang="scss">
.building-tools {
    background-color: #fff;
    border-right: 1px solid #d6dfe7;
    position: relative;
}
</style>
