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
        <!-- <ul class="page-list">
            <li
                v-for="item in meunList"
                :key="item.id"
                :class="{ 'active': item.id === currentSelectMenuId }"
                @click="handleSelect(item)"
            >
                <div class="category-item">
                    <div v-if="item.isEdit" class="title">
                        <input
                            :value="item.name"
                            @input="(evt) => handleInput(evt, item)"
                            @blur="handleBlur(item)"
                        />
                    </div>
                    <div v-else class="title">
                        <FolderOpenOutlined />
                        <span @dblclick="handleEdit(item)">{{ item.name }}</span>
                    </div>
                    <div class="icon" @click="handleDelete(item)">
                        <DeleteOutlined />
                    </div>
                </div>
                <ul v-if="item.pages && item.pages.length">
                    <li
                        v-for="page in item.pages"
                        :key="page.id"
                    >
                        <div>
                            <span>{{ page.name }}</span>
                        </div>
                    </li>
                </ul>
            </li>
        </ul> -->
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
        // DeleteOutlined,
        // FolderOpenOutlined,
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
        const handleSelect = (item) => {
            store.commit('workbench/CURRENT_SELECTE_MENU_ID', item.id);
            router.push({
                query: {
                    ...route.query,
                    menuId: item.id
                }
            });
        };
        if (route.query?.menuId) {
            store.commit('workbench/CURRENT_SELECTE_MENU_ID', +route.query.menuId);
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
                components: [],
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

        const handleEdit = (item) => {
            store.commit('workbench/page/UPDATE_DETAIL', {
                ...item,
                isEdit: true
            });
        };

        const handleBlur = (item) => {
            store.commit('workbench/page/UPDATE_DETAIL', {
                ...item,
                isEdit: false
            });
            const data = {
                ...item
            };
            delete data.isEdit;
            delete data.pages;
            store.dispatch('workbench/page/updateCategory', data);
        };

        const handleInput = (evt, item) => {
            store.commit('workbench/page/UPDATE_DETAIL', {
                ...item,
                name: evt.target.value
            });
        };

        const handleDelete = (item) => {
            store.dispatch('workbench/page/destroyCategory', item.id);
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

    .page-list {
        li {
            line-height: 28px;

            > .category-item {
                width: 100%;
                padding: 0 10px;
                display: flex;
                position: relative;
                z-index: 2;

                > .title {
                    flex: 1;
                    span {
                        margin-left: 5px;
                    }
                }

                > .icon {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    color: #999;

                    &:hover {
                        color: #FD00DB;
                        cursor: pointer;
                    }
                }
            }

            &.active {
                position: relative;
                &::after {
                    content: '';
                    display: block;
                    background-color: #ffd8f8;
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 28px;
                    z-index: 1;
                }
                // > .category-item {
                //     background-color: #ffd8f8;
                // }
            }

            input {
                line-height: 20px;
                height: 20px;
                border: none;
                background-color: #fff;
                outline: none;
                padding: 0 5px;
            }

            > ul {
                padding: 0 32px;
            }
        }
    }
}

</style>
