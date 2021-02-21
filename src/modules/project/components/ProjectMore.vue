<template>
    <a-dropdown
        trigger="click"
        placement="bottomRight"
        :overlay-style="{ width: '100px' }"
        @visible-change="handleVisibleChange"
    >
        <ellipsis-outlined />
        <template #overlay>
            <a-menu @click="handleMenu">
                <project-more-menu
                    v-for="(item) in moreMenuList"
                    :menu-item="item"
                    :key="item.value"
                />
            </a-menu>
        </template>
    </a-dropdown>
</template>

<script>
import { defineComponent, toRef, ref } from 'vue';
import { useStore } from 'vuex';
import {
    EllipsisOutlined,
} from '@ant-design/icons-vue';
import ProjectMoreMenu from './ProjectMoreMenu.vue';

export default defineComponent({
    name: 'project-more',
    components: {
        EllipsisOutlined,
        ProjectMoreMenu
    },
    props: {
        projectId: {
            type: Number
        }
    },
    setup(props, { emit }) {
        const store = useStore();
        const projectId = toRef(props, 'projectId');

        const moreMenuList = ref([
            { label: '重命名', value: 'rename', icon: 'form-outlined'},
            { label: '复制', value: 'copy', icon: 'copy-outlined'},
            { label: '删除', value: 'delete', icon: 'delete-outlined'},
            { label: 'divider', value: 'divider', icon: ''},
            { label: '分类', value: 'category', icon: 'folder-outlined', children: [
                { label: '分类1', value: 'category-1', icon: 'delete-outlined'},
                { label: '分类2', value: 'category-2', icon: 'delete-outlined'},
            ]},
            { label: '设置', value: 'setting', icon: 'setting-outlined'},
        ]);

        const handleVisibleChange = (visible) => {
            console.log('visible', visible);
            // event.stopPropagation();
            store.commit('project/UPDATE_ACTIVCE_STATE', {
                id: projectId.value,
                active: visible
            });
        };

        const handleMenu = ({ item, key, keyPath }) => {
            store.commit('project/UPDATE_ACTIVCE_STATE', {
                id: projectId.value,
                active: false
            });
            console.log('handleMenu item', item);
            console.log('handleMenu key', key);
            console.log('handleMenu keyPath', keyPath);
        };

        return {
            projectId,
            handleVisibleChange,
            handleMenu,
            moreMenuList
        };
    }
});
</script>
