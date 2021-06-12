<template>
    <plugin-view :name="config.name" :data-uuid="config.uuid">
        <draggable
            v-model="children"
            :component-data="{ class: 'editor-panel-drop', style:'min-height: 64px;' }"
            :group="{ name: 'views', pull: true, put: ['views', 'components'] }"
            item-key="uuid"
            tag="a-layout"
            @change="handleLog"
        >
            <template #item="{ element }">
                <render-component :config="element" />
            </template>
        </draggable>
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
    },
    setup() {
        const handleLog = () => {};

        return {
            handleLog
        };
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
