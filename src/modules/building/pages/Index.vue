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
import BuildingHeader from '../components/BuildingHeader';
import BuildingTools from '../components/BuildingTools';
import BuildingConfigs from '../components/BuildingConfigs';
import BuildingContent from '../components/BuildingContent';
import ToolBar from '../components/ToolBar';

export default {
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
};
</script>

<style lang="scss" scoped>
.building {
    width: 100%;
}
</style>
