<template>
    <plugin-view
        :config="config"
    >
        <a-layout :style="style" :has-sider="hasSider">
            <draggable
                v-model="children"
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
                @choose="handleSelect"
            >
                <template #item="{ element }">
                    <render-component :config="element" @select="handleSelect" />
                </template>
            </draggable>
        </a-layout>
    </plugin-view>
</template>

<script>
import { computed, defineComponent } from 'vue';
import { useStore } from 'vuex';
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
    emits: ['select'],
    setup(props, { emit }) {
        const store = useStore();
        const handleLog = (evt) => {
            console.log('evt === ', evt);
        };

        const handleSelect = (data) => {
            emit('select', data);
        };

        const children = computed({
            get() {
                return props.config.children;
            },
            set(val) {
                store.commit('workbench/page/UPDATE_COMPONENT_DETAIL', {
                    uuid: props.config.uuid,
                    data: val
                });
            }
        });

        return {
            handleLog,
            children,
            handleSelect
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
