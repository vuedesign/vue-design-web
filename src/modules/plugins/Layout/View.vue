<template>
    <plugin-view :name="config.name" :data-uuid="config.uuid">
        <a-layout style="min-height: 64px;">布局</a-layout>
    </plugin-view>
</template>

<script>
import { defineComponent } from 'vue';
import config from './config.json';
import { Layout } from 'ant-design-vue';

export default defineComponent({
    name: config.tag,
    props: {
        ...Layout.props,
        config: {
            type: Object,
            default: () => ({})
        }
    }
});
</script>

<style lang="scss">
.plugin-view-layout {
    width: 100%;
    height: min-content;
    display: flex;
}
</style>
