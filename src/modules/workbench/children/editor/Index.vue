<template>
    <editor-panel>
        <template v-if="pageDetail && pageDetail.options && pageDetail.options.panels.length">
            <div
                v-for="(item) in pageDetail.options.panels"
                :key="item.uuid"
            >
                <editor-panel-drop :model-value="item.children" @update:modelValue="(data) => handleUpdate(data, item.uuid)" />
            </div>
        </template>
    </editor-panel>
</template>

<script>
import { computed, defineComponent, watchEffect } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import EditorPanel from './EditorPanel.vue';
import EditorPanelDrop from './EditorPanelDrop.vue';

export default defineComponent({
    name: 'workbench-editor',
    components: {
        EditorPanel,
        EditorPanelDrop
    },
    setup() {

        const store = useStore();
        const route = useRoute();

        const pageDetail = computed(() => store.getters['workbench/page/pageDetail']);
        watchEffect(() => {
            // console.log('pageDetail', pageDetail.value);
            if (route.query.menuId && route.query.menuId.startsWith('page-')) {
                const pageId = route.query.menuId.split('-').pop();
                store.dispatch('workbench/page/findOne', +pageId);
            }
        });

        const handleUpdate = (data, uuid) => {
            store.commit('workbench/page/UPDATE_COMPONENT_DETAIL', {
                uuid,
                data
            });
        };

        return {
            pageDetail,
            handleUpdate
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
