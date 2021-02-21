<template>
    <a-layout-content class="workbench-content" @click="handleClick">
        <editor />
    </a-layout-content>
</template>

<script>
import Editor from '../children/editor/Index.vue';
import { useStore } from 'vuex';
import { computed, defineComponent } from 'vue';

export default defineComponent({
    name: 'workbench-content',
    components: {
        Editor
    },
    setup() {
        const store = useStore();
        const contextMenuStyle = computed(() => store.getters['workbench/editor/contextMenuStyle']);
        const handleClick = (event) => {
            event.stopPropagation();
            event.preventDefault();
            if (contextMenuStyle.value.display === 'none') {
                return;
            }
            store.commit('workbench/editor/UPDATE_CONTEXT_MENU_STYLE', {
                display: 'none'
            });
        };
        return {
            handleClick
        };
    }
});
</script>

<style scoped lang="scss">
.workbench-content {
    background-color: #eee;
    position: relative;
}

.workbench-content-inner {
    padding: 20px 60px;
}

</style>
