<template>
    <a-layout-content class="building-content" @click="handleClick">
        <editor />
    </a-layout-content>
</template>

<script>
import Editor from '../children/editor/Index';
import { useStore } from 'vuex';
import { computed } from 'vue';

export default {
    name: 'building-content',
    components: {
        Editor
    },
    setup() {
        const store = useStore();
        const contextMenuStyle = computed(() => store.getters['building/editor/contextMenuStyle']);
        const handleClick = (event) => {
            event.stopPropagation();
            event.preventDefault();
            if (contextMenuStyle.value.display === 'none') {
                return;
            }
            store.commit('building/editor/UPDATE_CONTEXT_MENU_STYLE', {
                display: 'none'
            });
        };
        return {
            handleClick
        };
    }
};
</script>

<style scoped lang="scss">
.building-content {
    background-color: #eee;
    position: relative;
}

.building-content-inner {
    padding: 20px 60px;
}

</style>
