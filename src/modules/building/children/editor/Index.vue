<template>
    <editor-panel>
        <div class="vd-page" @drop="handleDrop">
            <render-component
                v-for="item in currentComponentOptions"
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

        const currentComponentOptions = computed(() => store.getters['building/editor/currentComponentOptions']);

        console.log('currentComponentOptions', currentComponentOptions.value);

        const handleDrop = (event) => {
            console.log('event', event);
        };

        return {
            currentComponentOptions,
            handleDrop
        };
    }
};
</script>

<style scoped lang="scss">
.vd-page {
    position: relative;
    width: 100%;
    min-height: 100%;
    display: flex;
}

</style>
