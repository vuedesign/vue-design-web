<template>
    <component :is="currentTab" />
</template>

<script>
import { computed, defineComponent } from 'vue';
import { useStore } from 'vuex';
import ConfigPage from './components/ConfigPage.vue';

export default defineComponent({
    name: 'config',
    components: {
        ConfigPage,
    },
    setup() {
        const store = useStore();
        const currentTab = computed(() => store.getters['workbench/config/currentTab']);

        return {
            currentTab
        };
    }
});
</script>
