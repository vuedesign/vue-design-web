import { useStore } from 'vuex';
import { computed } from 'vue';

export function useCurrentToolBar() {
    const store = useStore();

    const currentToolBar = computed(() => store.getters['workbench/currentToolBar']);
    const updateCurrentToolBar = payload => {
        store.commit('workbench/UPDATE_CURRENT_TOOL_BAR', payload);
    };

    return {
        currentToolBar,
        updateCurrentToolBar
    };
}
