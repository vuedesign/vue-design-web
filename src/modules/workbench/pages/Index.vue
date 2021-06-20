<template>
    <a-layout class="layout">
        <layout-header />
        <a-layout class="layout-page">
            <layout-tools />
            <layout-content />
            <layout-configs />
            <tool-bar />
        </a-layout>
    </a-layout>
</template>

<script>
import { defineComponent } from 'vue';
import LayoutHeader from '../components/LayoutHeader.vue';
import LayoutTools from '../components/LayoutTools.vue';
import LayoutConfigs from '../components/LayoutConfigs.vue';
import LayoutContent from '../components/LayoutContent.vue';
import ToolBar from '../components/ToolBar.vue';

window.getso = window.getso || null;
// getso.unset();

export default defineComponent({
    name: 'workbench',
    components: {
        LayoutHeader,
        LayoutTools,
        LayoutConfigs,
        LayoutContent,
        ToolBar
    },
    setup() {
        return {};
    },
});
</script>

<style lang="scss" scoped>
.layout {
    width: 100%;
}
</style>
