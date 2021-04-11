<template>
    <div class="view-app">
        <plugin-drop-view
            :default-style="{
                width: 100,
                height: 32,
                left: 10,
                top: 300
            }"
            @move="hanldeMove"
        >
            <a-button
                type="primary"
                block
            >
                按钮
            </a-button>
        </plugin-drop-view>
        <plugin-drop-view
            @move="hanldeMove"
        >
            <div :style="{ minWidth: '20px' }">
                sfsdfsd
            </div>
        </plugin-drop-view>
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
import { computed, defineComponent, ref } from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
    name: 'design-app',
    setup() {
        const store = useStore();
        const currentDropComponent = computed(() => store.getters['workbench/currentDropComponent']);
        console.log('design currentDropComponent----', currentDropComponent.value);
        const activeKey = ref('1');
        const hanldeMove = (data) => {
            console.log('hanldeMove data: ', data);
        };

        return {
            currentDropComponent,
            activeKey,
            hanldeMove
        };
    }
});
</script>

<style lang="scss">
#appView {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;
  display: flex;
}
* {
    margin: 0;
    padding: 0;
    box-sizing: content-box;
}
ul, ol, li {
    list-style: none;
    margin: 0;
    padding: 0;
}

.view-app {
    height: 100%;
    width: 100%;
    -webkit-user-drag: none;
}
</style>
