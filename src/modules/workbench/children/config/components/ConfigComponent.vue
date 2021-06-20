<template>
    <layout-panel
        class="config-component"
        title="组件配置"
    >
        <section class="config-component-content">
            {{ currentComponentConfig }}
        </section>
    </layout-panel>
</template>

<script>
import { computed, defineComponent } from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
    name: 'config-compnent',
    setup() {
        const store = useStore();
        const currentComponentConfig = computed(() => store.getters['workbench/config/currentComponentConfig']);
        console.log('currentPageStyle==', currentComponentConfig.value);

        return {
            currentComponentConfig
        };
    }
});
</script>

<style lang="scss" scoped>
.config-component-configs {
    background-color: #203646;
}
</style>
