<template>
    <a-layout class="building">
        <building-header />
        <a-layout class="building-page">
            <building-tools />
            <building-content />
            <building-configs />
            <tool-bar />
        </a-layout>
    </a-layout>
</template>

<script>
import { defineComponent } from 'vue';
import BuildingHeader from '../components/BuildingHeader.vue';
import BuildingTools from '../components/BuildingTools.vue';
import BuildingConfigs from '../components/BuildingConfigs.vue';
import BuildingContent from '../components/BuildingContent.vue';
import ToolBar from '../components/ToolBar.vue';

window.getso = window.getso || null;
// getso.unset();

export default defineComponent({
    name: 'building',
    components: {
        BuildingHeader,
        BuildingTools,
        BuildingConfigs,
        BuildingContent,
        ToolBar
    },
    setup() {
        return {};
    },
});
</script>

<style lang="scss" scoped>
.building {
    width: 100%;
}
</style>
