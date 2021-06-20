<template>
    <component :is="currentConfigComponentName" />
</template>

<script>
import { computed, defineComponent } from 'vue';
import { useStore } from 'vuex';
import ConfigPage from './components/ConfigPage.vue';
import ConfigComponent from './components/ConfigComponent.vue';

export default defineComponent({
    name: 'workbench-config',
    components: {
        ConfigPage,
        ConfigComponent
    },
    setup() {
        const store = useStore();
        const currentConfigComponentName = computed(() => store.getters['workbench/config/currentConfigComponentName']);

        return {
            currentConfigComponentName
        };
    }
});
</script>
