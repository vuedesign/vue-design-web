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
                <li>
                    <apartment-outlined />
                    <span>分组</span>
                </li>
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
                    <div class="item" :class="{ active: item.active }">
                        <div class="item-inner">
                            <a-button
                                shape="round"
                                @click="handleGotoWorkbench(item)"
                            >
                                <template #icon>
                                    <form-outlined />
                                </template>
                                编辑
                            </a-button>
                        </div>
                        <div class="item-more">
                            <project-more :project-id="item.id" />
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
        <project-add v-model:visible="visible" />
    </a-layout-content>
</template>
<script>
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import {
    PlusOutlined,
    FilterOutlined,
    ApartmentOutlined,
    ClockCircleOutlined
} from '@ant-design/icons-vue';
import ProjectAdd from './ProjectAdd.vue';
import ProjectMore from '../components/ProjectMore.vue';

export default {
    name: 'page-project',
    components: {
        PlusOutlined,
        FilterOutlined,
        ApartmentOutlined,
        ClockCircleOutlined,
        ProjectAdd,
        ProjectMore
    },
    setup() {
        const router = useRouter();
        const store = useStore();

        store.dispatch('project/find');

        const list = computed(() => store.getters['project/list']);
        const filter = computed(() => store.getters['project/filter']);
        const total = computed(() => store.getters['project/total']);

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

        const handleGotoWorkbench = ({ id }) => {
            console.log('item', id);
            router.push({
                name: 'workbench',
                params: {
                    id
                }
            });
        };

        const visible = ref(false);
        const handleAddProject = () => {
            visible.value = true;
        };

        const isOrderTime = ref(false);
        const handleToggleOrderTime = () => {
            isOrderTime.value = !isOrderTime.value;
            store.dispatch('project/find', {
                order: isOrderTime.value ? 'updatedAt ASC': 'updatedAt DESC'
            });
        };

        return {
            visible,
            list,
            filter,
            total,
            currentPage,
            handleGotoWorkbench,
            handleAddProject,
            handleToggleOrderTime,
            isOrderTime
        };
    }
};
</script>

<style scoped lang="scss">
.page-project {
    width: 1200px;
    margin: 0 auto;
    min-height: calc(100% - 158px);
}

.list-nav {
    padding-top: 40px;

    ul {
        display: flex;
    }

    li {
        margin-right: 20px;

        span {
            padding-left: 5px;
        }

        &.btn-order-time {
            cursor: pointer;
            &.active {
                color: #1890ff;
            }
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

            &:hover,
            &.active {
                background-color: #F2F2F2;

                .item-inner {
                    display: flex;
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
</style>
