<template>
    <a-layout class="workbench">
        <workbench-header />
        <a-layout class="workbench-page">
            <workbench-tools />
            <workbench-content />
            <workbench-configs />
            <tool-bar />
        </a-layout>
    </a-layout>
</template>

<script>
import { defineComponent } from 'vue';
import WorkbenchHeader from '../components/WorkbenchHeader.vue';
import WorkbenchTools from '../components/WorkbenchTools.vue';
import WorkbenchConfigs from '../components/WorkbenchConfigs.vue';
import WorkbenchContent from '../components/WorkbenchContent.vue';
import ToolBar from '../components/ToolBar.vue';

window.getso = window.getso || null;
// getso.unset();

export default defineComponent({
    name: 'workbench',
    components: {
        WorkbenchHeader,
        WorkbenchTools,
        WorkbenchConfigs,
        WorkbenchContent,
        ToolBar
    },
    setup() {
        return {};
    },
});
</script>

<style lang="scss" scoped>
.workbench {
    width: 100%;
}
</style>
