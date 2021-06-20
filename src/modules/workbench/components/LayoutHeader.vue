<template>
    <a-layout-header class="layout-header">
        <div class="project-name">
            <appstore-outlined class="icon-back" @click="handleBack" />
            <span v-if="detail && detail.name" class="label">{{ detail.name }}</span>
        </div>
    </a-layout-header>
</template>

<script>
import { ref, computed, defineComponent } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { MENU_LIST } from '../contants';
import { AppstoreOutlined } from '@ant-design/icons-vue';

export default defineComponent({
    name: 'layout-header',
    components: {
        AppstoreOutlined
    },
    setup() {
        const route = useRoute();
        const router = useRouter();
        const store = useStore();

        store.dispatch('project/findOne', +route.params.id);

        const detail = computed(() => store.getters['project/detail']);
        const getRouteNames = route => [route.name.split('-').pop()];
        const selectedKeys = ref(getRouteNames(route));

        const handleCheck = ({ item }) => {
            router.push({
                name: `workbench-${item.value}`
            });
        };

        const handleBack = () => {
            router.push({
                name: `project`
            });
        };

        return {
            selectedKeys,
            menuList: MENU_LIST,
            detail,
            handleCheck,
            handleBack
        };
    }
});
</script>

<style scoped lang="scss">
.layout-header {
    display: flex;
    width: 100%;
    height: 48px;
    padding: 0;
    background-color: #fff;
    border-bottom: 1px solid #d6dfe7;
}

.project-name {
    padding: 15px 12px 12px 15px;
    line-height: 16px;

    span {
        display: inline-block;
        color: #333;
        text-align: center;
        vertical-align: middle;
        height: 16px;
        line-height: 16px;
    }

    .icon-back {
        width: 16px;
        text-align: center;
        font-size: 16px;
        cursor: pointer;
    }

    .label {
        padding: 0 10px;
        padding-top: 1px;
    }
}
</style>
