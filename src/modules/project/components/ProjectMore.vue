<template>
    <a-dropdown
        trigger="click"
        placement="bottomRight"
        :overlay-style="{ width: '120px' }"
        @visible-change="handleVisibleChange"
    >
        <ellipsis-outlined />
        <template #overlay>
            <a-menu
                @click="handleMenu"
                v-model:selectedKeys="selectedKeys"
            >
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
import { defineComponent, toRef, ref, computed } from 'vue';
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
        projectItem: {
            type: Object,
            default: () => ({})
        }
    },
    setup(props, { emit }) {
        const store = useStore();
        const projectItem = toRef(props, 'projectItem');
        const { id } = projectItem.value;
        const selectedKeys = computed(() => {
            const tagIds = props.projectItem.tagIds;
            return !tagIds ? [] : tagIds.split(',').map(Number);
        });

        const tagList = computed(() => store.getters['globals/tagList']);
        const menuList = ref([
            { label: '重命名', value: 'rename', icon: 'form-outlined'},
            { label: '复制', value: 'copy', icon: 'copy-outlined'},
            { label: '删除', value: 'delete', icon: 'delete-outlined'},
            { label: 'divider', value: 'divider', icon: ''},
            { label: '打标签', value: 'tags', icon: 'tags-outlined', children: [
                // { label: '标签1', value: 'category-1', icon: 'delete-outlined'}
            ]},
            { label: '设置', value: 'setting', icon: 'setting-outlined'},
        ]);
        const moreMenuList = computed(() => {
            const index = menuList.value.findIndex(item => item.value === 'tags');
            let categoryChildren = [];
            tagList.value.forEach(item => {
                categoryChildren.push({
                    label: item.name,
                    value: item.id,
                    icon: 'tag-outlined'
                })
            });
            menuList.value[index].children = categoryChildren;
            return menuList.value;
        });

        const handleVisibleChange = (visible) => {
            store.commit('project/UPDATE_ACTIVCE_STATE', {
                id,
                active: visible
            });
        };

        const handleMenu = ({ item, key, keyPath }) => {
            store.commit('project/UPDATE_ACTIVCE_STATE', {
                id,
                active: false
            });

            if (keyPath.pop() === 'tags') {
                const index = selectedKeys.value.findIndex(item => Number(item) === Number(key));
                if (index > -1) {
                    selectedKeys.value.splice(index, 1);
                } else {
                    selectedKeys.value.push(key);
                }
                store.dispatch('project/updateField', {
                    id,
                    field: 'tagIds',
                    type: 'string',
                    value: selectedKeys.value.join(',')
                });
            }
        };

        return {
            projectItem,
            handleVisibleChange,
            handleMenu,
            moreMenuList,
            selectedKeys
        };
    }
});
</script>
