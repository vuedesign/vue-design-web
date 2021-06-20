<template>
    <layout-panel
        class="workbench-page-tools"
        title="页面"
    >
        <template #tools>
            <li class="btn-item" @click="handleAddCategory">
                <folder-add-outlined />
            </li>
            <li class="btn-item" @click="handleAddPage">
                <plus-square-outlined />
            </li>
        </template>
        <menu-list
            :menu-list="menuList"
            :current-select-menu-id="currentSelectMenuId"
            @select="handleSelect"
            @input="handleInput"
            @blur="handleBlur"
            @edit="handleEdit"
            @del="handleDelete"
        />
    </layout-panel>
</template>

<script>
import { computed, defineComponent, reactive, watchEffect } from 'vue';
import LayoutPanel from '@/modules/workbench/components/LayoutPanel.vue';
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';
import { v4 as uuidv4 } from 'uuid';
import MenuList from './MenuList.vue';
import {
    FolderAddOutlined,
    PlusSquareOutlined,
} from '@ant-design/icons-vue';

export default defineComponent({
    name: 'page-tools',
    components: {
        LayoutPanel,
        FolderAddOutlined,
        PlusSquareOutlined,
        MenuList
    },
    setup() {
        const store = useStore();
        const router = useRouter();
        const route = useRoute();
        const menuList = computed(() => store.getters['workbench/page/menuList']);
        const projectDetail = computed(() => store.getters['project/detail']);

        watchEffect(() => {
            if (projectDetail.value.id) {
                store.dispatch('workbench/page/findCategory', {
                    projectId: projectDetail.value.id
                });
            }
        });

        const currentSelectMenuId = computed(() => store.getters['workbench/currentSelectMenuId']);
        const handleSelect = (item, type) => {
            const menuId = `${type}-${item.id}`;
            store.commit('workbench/CURRENT_SELECTE_MENU_ID', menuId);
            router.push({
                query: {
                    ...route.query,
                    menuId
                }
            });
        };
        if (route.query?.menuId) {
            store.commit('workbench/CURRENT_SELECTE_MENU_ID', route.query.menuId);
        }

        const createGategoryData = reactive({
            name: '分组-新建',
            description: '',
            parentId: 0,
            projectId: 0,
            order: 0
        });
        const handleAddCategory = () => {
            createGategoryData.projectId = projectDetail.value.id;
            store.dispatch('workbench/page/create', createGategoryData);
        };

        const createPageData = reactive({
            name: '页面-新建',
            description: '',
            categoryId: 0,
            cateId: 0,
            projectId: 0,
            options: {}
        });
        const handleAddPage = () => {
            const panelData = {
                uuid: uuidv4(),
                type: 'default',
                rect: {
                    top: 0,
                    left: 0,
                    width: 1440,
                    height: 800
                },
                children: [],
                isEdit: true
            };
            if (currentSelectMenuId.value) {
                createPageData.categoryId = currentSelectMenuId.value;
            }
            createPageData.projectId = projectDetail.value.id;
            createPageData.options = {
                rect: {
                    top: 0,
                    left: 0,
                    width: 1440,
                    height: 800
                },
                panels: [
                    panelData
                ]
            };
            store.dispatch('workbench/page/create', createPageData);
        };

        const handleEdit = (item, type) => {
            store.commit('workbench/page/UPDATE_DETAIL', {
                data: {
                    ...item,
                    isEdit: true
                },
                type
            });
        };

        const handleBlur = (item, type) => {
            store.commit('workbench/page/UPDATE_DETAIL', {
                data: {
                    ...item,
                    isEdit: false
                },
                type
            });
            const data = {
                ...item
            };
            delete data.isEdit;
            delete data.pages;
            if (type === 'category') {
                store.dispatch('workbench/page/updateCategory', data);
            } else {
                store.dispatch('workbench/page/update', data);
            }
        };

        const handleInput = (evt, item, type) => {
            store.commit('workbench/page/UPDATE_DETAIL', {
                data: {
                    ...item,
                    name: evt.target.value
                },
                type
            });
        };

        const handleDelete = (item, type) => {
            if (type === 'category') {
                store.dispatch('workbench/page/destroyCategory', item.id);
            } else {
                store.dispatch('workbench/page/destroy', item.id);
            }
        };

        return {
            currentSelectMenuId,
            handleSelect,
            menuList,
            handleAddCategory,
            handleAddPage,
            projectDetail,
            handleEdit,
            handleBlur,
            handleInput,
            handleDelete
        };
    }
});
</script>

<style lang="scss" scoped>
.workbench-page-tools {
    background-color: transparent;
    position: relative;
}

</style>
