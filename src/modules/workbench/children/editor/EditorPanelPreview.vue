
<template>
    <div class="editor-panel-preview">
        {{ currentComponentStyle }}
        <a-button @click="handleClick">click</a-button>
        <plugin-drop-view
            :default-style="{
                width: 200,
                height: 200,
                left: 10,
                top: 10
            }"
            @move="hanldeMove"
        >
            <a-tabs v-model:activeKey="activeKey">
                <a-tab-pane key="1" tab="Tab 1">Content of Tab Pane 1</a-tab-pane>
                <a-tab-pane key="2" tab="Tab 2" force-render>Content of Tab Pane 2</a-tab-pane>
                <a-tab-pane key="3" tab="Tab 3">Content of Tab Pane 3</a-tab-pane>
            </a-tabs>
        </plugin-drop-view>
    </div>
</template>
<script>
import { defineComponent, computed, ref } from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
    name: 'editor-panel-preview',
    setup() {
        const store = useStore();
        const currentComponentStyle = computed(() => store.getters['workbench/currentComponentStyle']);

        const activeKey = ref(1);

        const hanldeMove = () => {};

        const handleClick = () => {
            store.commit('workbench/UPDATE_CURRENT_COMPONENT_STYLE', {
                width: '100%',
                left: currentComponentStyle.value.left + 1
            });
        };

        return {
            handleClick,
            currentComponentStyle,
            activeKey,
            hanldeMove
        };
    }
});
</script>

<style lang="scss" scoped>
.editor-panel-preview {
    background-color: transparent;
    position: absolute;
    width: 100%;
    height: 100%;
    border: none;
    top: 0;
    left: 0;
    z-index: 10;
}
</style>
