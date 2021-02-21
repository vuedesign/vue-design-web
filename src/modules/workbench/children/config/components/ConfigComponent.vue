<template>
    <a-layout-sider
        class="workbench-page-configs"
        theme="light"
        width="240px"
    >
        configs
    </a-layout-sider>
</template>

<script>
import { computed, defineComponent } from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
    name: 'workbench-page-configs',
    setup() {
        const store = useStore();
        const currentPageStyle = computed(() => store.getters['workbench/page/currentPageStyle']);
        console.log('currentPageStyle==', currentPageStyle.value);

        return {
            currentPageStyle
        };
    }
});
</script>

<style lang="scss" scoped>
.workbench-page-configs {
    background-color: #203646;
}
</style>
