<template>
    <a-layout-sider
        class="workbench-tools"
        theme="light"
        width="241px"
    >
        <component :is="`${currentToolBar}Tools`" />
    </a-layout-sider>
</template>

<script>
import { defineComponent } from 'vue';
import { useCurrentToolBar } from '../services/toolBar';
import ComponentTools from '../children/component/components/ComponentTools.vue';
import IconTools from '../children/icon/components/IconTools.vue';
import MaterialTools from '../children/material/components/MaterialTools.vue';
import PageTools from '../children/page/components/PageTools.vue';

export default defineComponent({
    name: 'layout-tools',
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
});
</script>

<style scoped lang="scss">
.layout-tools {
    background-color: #fff;
    border-right: 1px solid #d6dfe7;
    position: relative;
}
</style>
