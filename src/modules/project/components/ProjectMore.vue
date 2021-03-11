<template>
    <a-dropdown
        :trigger="['click']"
        placement="bottomRight"
        :overlay-style="{ width: '120px' }"
        @visible-change="handleVisibleChange"
    >
        <ellipsis-outlined />
        <template #overlay>
            <a-menu
                v-model:selectedKeys="selectedKeys"
                @click="handleMenu"
            >
                <project-more-menu
                    v-for="(item) in moreMenuList"
                    :key="item.value"
                    :menu-item="item"
                />
            </a-menu>
        </template>
    </a-dropdown>
</template>

<script>
import { defineComponent, toRef, computed } from 'vue';
import { useStore } from 'vuex';
import {
    EllipsisOutlined,
} from '@ant-design/icons-vue';
import { message } from 'ant-design-vue';
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
    emits: ['menu-edit'],
    setup(props, { emit }) {
        const store = useStore();
        const projectDetail = toRef(props, 'projectItem');
        const { id } = projectDetail.value;
        const selectedKeys = computed(() => {
            const tagIds = props.projectItem.tagIds;
            return !tagIds ? [] : tagIds.split(',').map(Number);
        });

        // 我的标签列表
        const tagList = computed(() => store.getters['globals/tagList']);

        // 项目列表-更多菜单
        const menuList = [
            { label: '编辑', value: 'edit', icon: 'form-outlined'},
            { label: '复制', value: 'copy', icon: 'copy-outlined'},
            { label: '删除', value: 'delete', icon: 'delete-outlined'},
            { label: 'divider', value: 'divider', icon: ''},
            { label: '打标签', value: 'tags', icon: 'tags-outlined', children: [
                // { label: '标签1', value: 'category-1', icon: 'delete-outlined'}
            ]},
            { label: '设置', value: 'setting', icon: 'setting-outlined'},
        ];

        // 向更多菜单添加标签列表数据
        const moreMenuList = computed(() => {
            const categoryChildren = tagList.value.map(item => {
                return {
                    label: item.name,
                    value: item.id,
                    icon: 'tag-outlined'
                };
            });
            const index = menuList.findIndex(item => item.value === 'tags');
            const newMenuList = [...menuList];
            newMenuList[index].children = categoryChildren;
            return newMenuList;
        });

        // 下拉更多菜单状态
        const handleVisibleChange = (visible) => {
            store.commit('project/UPDATE_ACTIVCE_STATE', {
                id,
                active: visible
            });
        };

        // 点击菜单
        const handleMenu = ({ key, keyPath }) => {
            store.commit('project/UPDATE_ACTIVCE_STATE', {
                id,
                active: false
            });

            const menuType = keyPath.pop();
            switch(menuType) {
            case 'tags': tags(key);
                break;
            case 'edit': emit('menu-edit', projectDetail.value);
                break;
            case 'copy': copy(id);
                break;
            case 'delete': del(id);
                break;
            }
        };

        // 大标签
        function tags(key) {
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

        function copy(id) {
            message.success('点击了-复制功能-待开发！');
            console.log('copy', id);
        }

        function del(id) {
            store.dispatch('project/destroy', id).then(() => {
                message.success('删除成功！');
            }).catch(() => {
                message.error('删除失败！');
            });
        }

        return {
            projectDetail,
            handleVisibleChange,
            handleMenu,
            moreMenuList,
            selectedKeys
        };
    }
});
</script>
