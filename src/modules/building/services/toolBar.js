import { useStore } from 'vuex';
import { computed } from 'vue';

export function useCurrentToolBar() {
    const store = useStore();

    const currentToolBar = computed(() => store.getters['building/currentToolBar']);
    const updateCurrentToolBar = payload => {
        store.commit('building/UPDATE_CURRENT_TOOL_BAR', payload);
    };

    return {
        currentToolBar,
        updateCurrentToolBar
    };
}
