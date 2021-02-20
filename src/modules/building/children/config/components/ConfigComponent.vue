<template>
    <a-layout-sider
        class="building-page-configs"
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
    name: 'building-page-configs',
    setup() {
        const store = useStore();
        const currentPageStyle = computed(() => store.getters['building/page/currentPageStyle']);
        console.log('currentPageStyle==', currentPageStyle.value);

        return {
            currentPageStyle
        };
    }
});
</script>

<style lang="scss" scoped>
.building-page-configs {
    background-color: #203646;
}
</style>
