<template>
    <plugin-view
        :name="config.name"
        :data-uuid="config.uuid"
    >
        <!-- {{ config.children }} -->
        <a-layout :style="style" :has-sider="hasSider">
            <draggable
                :list="config.children"
                :component-data="{
                    class: 'editor-panel-drop',
                    style:'min-height: 64px;'
                }"
                :group="{
                    name: 'views',
                    pull: true,
                    put: ['views', 'components']
                }"
                item-key="uuid"
                @change="handleLog"
            >
                <template #item="{ element }">
                    <render-component :config="element" />
                </template>
            </draggable>
        </a-layout>
    </plugin-view>
</template>

<script>
import { defineComponent } from 'vue';
import config from './config.json';
// import { Layout } from 'ant-design-vue';

export default defineComponent({
    name: config.tag,
    props: {
        config: {
            type: Object,
            default: () => ({})
        },
        hasSider: {
            type: Boolean,
            default: false
        },
        style: {
            type: Object,
            default: () => ({})
        }
    },
    setup(props) {
        console.log('props ===== ', props.config);
        const handleLog = (evt) => {
            console.log('evt === ', evt);
        };

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
