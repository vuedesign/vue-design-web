<template>
    <div class="context-menu" :style="contextMenuStyle">
        <a-menu size="small">
            <template v-for="item in menuList">
                <template v-if="item.children && item.children.length">
                    <a-sub-menu
                        :key="item.value"
                        @click="handleGotoSubMenu"
                    >
                        <template #title>
                            <component :is="item.icon" />
                            {{ item.label }}
                        </template>
                        <a-menu-item
                            :is="i.tag"
                            v-for="i in item.children"
                            :key="i.value"
                        >
                            <component :is="i.icon" />
                            {{ i.label }}
                        </a-menu-item>
                    </a-sub-menu>
                </template>
                <a-menu-divider
                    v-else-if="item.value === 'divider'"
                    :key="item.value"
                />
                <a-menu-item
                    v-else
                    :key="item.value"
                >
                    <component :is="item.icon" />
                    {{ item.label }}
                </a-menu-item>
            </template>
        </a-menu>
    </div>
</template>
<script>
import { computed, ref, defineComponent } from 'vue';
import { useStore } from 'vuex';
import {
    DeleteOutlined,
    PlusOutlined,
    BlockOutlined,
    AlignLeftOutlined,
    AlignRightOutlined
} from '@ant-design/icons-vue';

export default defineComponent({
    name: 'context-menu',
    components: {
        DeleteOutlined,
        PlusOutlined,
        BlockOutlined,
        AlignLeftOutlined,
        AlignRightOutlined
    },
    setup() {
        const store = useStore();

        const menuList = ref([
            { value: 'del', label: '删除', icon: 'delete-outlined' },
            { value: 'divider' },
            { value: 'copy', label: '复制到', icon: 'block-outlined', children: [
                { value: 'before', label: '在前面', icon: 'align-left-outlined' },
                { value: 'after', label: '在后面', icon: 'align-right-outlined' },
            ] }
        ]);
        const contextMenuStyle = computed(() => store.getters['workbench/editor/contextMenuStyle']);
        const contextMenuUuid = computed(() => store.getters['workbench/editor/contextMenuUuid']);

        const handleGotoSubMenu = (event) => {
            event.preventDefault();
            event.stopPropagation();
        };

        return {
            contextMenuStyle,
            contextMenuUuid,
            menuList,
            handleGotoSubMenu
        };
    }
});
</script>

<style lang="scss" scoped>
.context-menu {
    display: none;
    position: absolute;
    background-color: red;
    z-index: 10000;
    width: 160px;
}
</style>
