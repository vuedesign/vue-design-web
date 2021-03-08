<template>
    <a-layout-content class="page-project">
        <div class="list-nav">
            <ul>
                <li
                    class="btn-order-time"
                    :class="{ active: isOrderTime }"
                    @click="handleToggleOrderTime"
                >
                    <clock-circle-outlined />
                    <span>时间排序</span>
                </li>
                <!-- <li>
                    <filter-outlined />
                    <span>时间排序</span>
                </li> -->
                <a-dropdown
                    trigger="click"
                    placement="bottomLeft"
                    :overlay-style="{ width: '120px' }"
                    @visible-change="handleVisibleChange"
                >
                    <li :class="{ active: isTagFilter }">
                        <tag-outlined v-if="isTagFilter" />
                        <tags-outlined v-else />
                        <span>{{ currentTagLabel }}</span>
                        <caret-up-outlined class="tag-filter-icon" v-if="isTagOpen" />
                        <caret-down-outlined class="tag-filter-icon" v-else />
                    </li>
                    <template #overlay>
                        <a-menu
                            @click="handleTagFilter"
                            v-model:selectedKeys="selectedTagKeys"
                        >
                            <a-menu-item :key="0">
                                <tags-outlined />
                                全部
                            </a-menu-item>
                            <project-more-menu
                                v-for="(item) in tagList"
                                :menu-item="item"
                                :key="item.value"
                            />
                        </a-menu>
                    </template>
                </a-dropdown>
            </ul>
        </div>
        <div class="list-content">
            <!-- <a-row>
                <a-col :xs="2" :sm="4" :md="6" :lg="8" :xl="10">Col</a-col>
                <a-col :xs="20" :sm="16" :md="12" :lg="8" :xl="4">Col</a-col>
                <a-col :xs="2" :sm="4" :md="6" :lg="8" :xl="10">Col</a-col>
            </a-row> -->
            <ul>
                <li>
                    <div class="item">
                        <div class="item-inner btn-add" @click="handleAddProject">
                            <plus-outlined />
                            <span>创建</span>
                        </div>
                    </div>
                </li>
                <li
                    v-for="item in list"
                    :key="item.id"
                >
                    <div
                        class="item"
                        :class="{ active: item.active }"
                        :style="{ backgroundImage: `url(/${item.thumb})` }"
                    >
                        <div class="item-inner">
                            <a-button
                                shape="round"
                                @click="handleGotoWorkbench(item)"
                            >
                                <template #icon>
                                    <form-outlined />
                                </template>
                                开始设计
                            </a-button>
                        </div>
                        <div class="item-more">
                            <project-more :project-item="item" @menu-edit="handleEditProject" />
                        </div>
                    </div>
                    <div class="title">
                        {{ item.description }}
                    </div>
                </li>
            </ul>
        </div>
        <div class="list-pagination">
            <a-pagination
                v-model:current="currentPage"
                v-model:pageSize="filter.size"
                :total="total"
                show-less-items
            />
        </div>
        <project-add v-model:visible="addVisible" />
        <project-edit v-model:visible="editVisible" />
    </a-layout-content>
</template>
<script>
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import {
    PlusOutlined,
    FilterOutlined,
    ClockCircleOutlined,
    TagsOutlined,
    TagOutlined,
    CaretDownOutlined,
    CaretUpOutlined
} from '@ant-design/icons-vue';
import ProjectAdd from './ProjectAdd.vue';
import ProjectEdit from './ProjectEdit.vue';
import ProjectMore from '../components/ProjectMore.vue';
import ProjectMoreMenu from '../components/ProjectMoreMenu.vue';

export default {
    name: 'page-project',
    components: {
        PlusOutlined,
        FilterOutlined,
        ClockCircleOutlined,
        TagsOutlined,
        TagOutlined,
        CaretDownOutlined,
        CaretUpOutlined,
        ProjectAdd,
        ProjectEdit,
        ProjectMore,
        ProjectMoreMenu
    },
    setup() {
        const router = useRouter();
        const store = useStore();

        store.dispatch('project/find');
        store.dispatch('globals/findTag');

        // 列表与分页
        const list = computed(() => store.getters['project/list']);
        const filter = computed(() => store.getters['project/filter']);
        const total = computed(() => store.getters['project/total']);
        // 分页-当前页面
        const currentPage = computed({
            get() {
                return filter.value.page;
            },
            set(page) {
                store.dispatch('project/find', {
                    page
                });
            }
        })

        // 跳转到设计面板
        const handleGotoWorkbench = ({ id }) => {
            console.log('item', id);
            router.push({
                name: 'workbench',
                params: {
                    id
                }
            });
        };

        // 添加项目
        const addVisible = ref(false);
        const handleAddProject = () => {
            addVisible.value = true;
        };

        // 时间排序
        const isOrderTime = ref(false);
        const handleToggleOrderTime = () => {
            isOrderTime.value = !isOrderTime.value;
            store.dispatch('project/find', {
                order: isOrderTime.value ? 'updatedAt ASC': 'updatedAt DESC'
            });
        };

        // 标签列表
        const tagList = computed(() => {
            return store.getters['globals/tagList'].map(item => ({
                value: item.id,
                label: item.name,
                icon: 'tag-outlined'
            }));
        });
        // 标签过滤
        const selectedTagKeys = ref([0]);
        const isTagFilter = ref(false);
        const currentTagLabel = ref('标签过滤');
        const isTagOpen = ref(false);
        const handleTagFilter = ({ item, key, keyPath }) => {
            selectedTagKeys.value = [key];
            if (key === 0) {
                isTagFilter.value = false;
                currentTagLabel.value = '标签过滤';
            } else {
                isTagFilter.value = true;
                currentTagLabel.value = item.title;
            }
            isTagOpen.value = false;
            store.dispatch('project/find', {
                tagId: key
            });
        };

        const handleVisibleChange = (visible) => {
            isTagOpen.value = visible;
        };

        // 编辑项目
        const editVisible = ref(false);
        const handleEditProject = () => {
            editVisible.value = true;
        };

        return {
            addVisible,
            editVisible,
            list,
            filter,
            total,
            currentPage,
            handleGotoWorkbench,
            handleAddProject,
            handleToggleOrderTime,
            isOrderTime,
            tagList,
            selectedTagKeys,
            handleTagFilter,
            isTagFilter,
            currentTagLabel,
            handleVisibleChange,
            isTagOpen,
            handleEditProject
        };
    }
};
</script>

<style scoped lang="scss">
.page-project {
    width: 100%;
    max-width: 1300px;
    margin: 0 auto;
    padding: 0 50px;
    min-height: auto;
    padding-bottom: 20px;
}

.list-nav {
    padding-top: 40px;

    ul {
        display: flex;
    }

    li {
        margin-right: 20px;
        cursor: pointer;

        span {
            padding-left: 5px;
        }

        &.active {
            color: #1890ff;
        }

        .tag-filter-icon {
            color: #aaa;
        }
    }
}

.list-content {
    width:  100%;
    ul {
        margin: 0 -8px;
        &::after {
            content: '';
            display: block;
            clear: both;
            width: 100%;
        }
    }

    li {
        padding: 8px;
        width: 25%;
        float: left;

        .item {
            width: 100%;
            padding-top: percentage(170/288);
            background-color: #fff;
            position: relative;
            height: 0;
            border-radius: 3px;
            background-position: center center;
            background-repeat: no-repeat;
            background-size: cover;

            &:hover,
            &.active {
                background-color: #F2F2F2;

                .item-inner {
                    display: flex;
                    background-color: rgba(200, 200, 200, .8);
                }

                .item-more {
                    display: block;
                }
            }
        }

        .item-inner {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            justify-content: center;
            align-items: center;
            display: none;

            &.btn-add {
                display: flex;
                cursor: pointer;

                span {
                    color: #999;
                }
                i {
                    color: #ddd;
                }
            }
        }

        .item-more {
            display: none;
            position: absolute;
            top: 10px;
            right: 10px;
            width: 20px;
            height: 20px;
            text-align: center;
            cursor: pointer;
            color: #fff;
            font-weight: 700;
        }

        .title {
            height: 36px;
            line-height: 36px;
        }
    }
}

.list-pagination {
    display: flex;
    justify-content: center;
}

@media screen and (max-width: 1100px) {
    .list-content {
        li {
            width: percentage(1/3);
        }
    }
}


@media screen and (max-width: 700px) {
    .list-content {
        li {
            width: percentage(1/2);
        }
    }
}
</style>
