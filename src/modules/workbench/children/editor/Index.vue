<template>
    <editor-panel>
        <editor-panel-drop v-model="componentTree" />
    </editor-panel>
</template>

<script>
import { computed, defineComponent } from 'vue';
import { useStore } from 'vuex';
import EditorPanel from './EditorPanel.vue';
import EditorPanelDrop from './EditorPanelDrop.vue';

export default defineComponent({
    name: 'workbench-content',
    components: {
        EditorPanel,
        EditorPanelDrop
    },
    setup() {

        const store = useStore();
        const componentTree = computed({
            get() {
                return store.getters['workbench/componentTree'];
            },
            set(val) {
                console.log('val', val);
                store.commit('workbench/COMPONENT_TREE', val);
            }
        });

        return {
            componentTree
        };
    }
});
</script>

<style scoped lang="scss">
.vd-page {
    position: relative;
    width: 100%;
    height: 100%;
    display: block;
}

</style>
<style lang="scss">
.vd-page {
    overflow: hidden;
    .drop-cache {
        display: block;
        width: 100%;
        height: 20px;
        background-color: cornflowerblue;
    }
}

#editor-panel-tools {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 2;
    // background-color: #fff;
}
</style>
