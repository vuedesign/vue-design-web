<template>
    <editor-panel>
        <div
            class="vd-page"
            :style="currentPageStyle"
            @drop="handleDrop"
        >
            <render-component
                v-for="item in componentTree"
                :key="item.id"
                :option="item"
            />
        </div>
    </editor-panel>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';
// import { v4 as uuidv4 } from 'uuid';
import EditorPanel from './EditorPanel';
import RenderComponent from './RenderComponent.vue';

export default {
    name: 'building-content',
    components: {
        EditorPanel,
        RenderComponent
    },
    setup() {

        const store = useStore();

        // store.commit('building/UUID_LIST', [uuidv4()]);

        const componentTree = computed(() => store.getters['building/componentTree']);
        const currentPageStyle = computed(() => store.getters['building/currentPageStyle']);

        console.log('componentTreeOptions', componentTree.value);

        const handleDrop = (event) => {
            console.log('event', event);
        };

        return {
            componentTree,
            currentPageStyle,
            handleDrop
        };
    }
};
</script>

<style scoped lang="scss">
.vd-page {
    position: relative;
    width: 100%;
    height: 100%;
    display: block;
}

</style>
