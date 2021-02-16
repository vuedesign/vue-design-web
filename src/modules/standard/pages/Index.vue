<template>
    <a-layout-content class="page-standard">
        <div class="list-nav">
            <ul>
                <li>
                    <filter-outlined />
                    <span>时间排序</span>
                </li>
                <li>
                    <apartment-outlined />
                    <span>分组</span>
                </li>
            </ul>
        </div>
        <div class="list-content">
            <ul>
                <li>
                    <div class="item">
                        <div class="item-inner btn-add">
                            <plus-outlined />
                            <span>创建</span>
                        </div>
                    </div>
                </li>
                <li
                    v-for="item in list"
                    :key="item.id"
                >
                    <div class="item">
                        <div class="item-inner">
                            <a-button
                                shape="round"
                                @click="handleBuilding(item)"
                            >
                                <template #icon>
                                    <form-outlined />
                                </template>
                                编辑
                            </a-button>
                        </div>
                        <div class="item-more">
                            <a-dropdown
                                trigger="click"
                                placement="bottomRight"
                                :overlay-style="{ width: '100px' }"
                            >
                                <ellipsis-outlined @click="e => e.preventDefault()" />
                                <template #overlay>
                                    <a-menu>
                                        <a-menu-item>
                                            <form-outlined />
                                            重命名
                                        </a-menu-item>
                                        <a-menu-item>
                                            <copy-outlined />
                                            克隆
                                        </a-menu-item>
                                        <a-menu-item>
                                            <delete-outlined />
                                            删除
                                        </a-menu-item>
                                        <a-menu-divider />
                                        <a-sub-menu
                                            key="test"
                                            popup-class-name="class-sub-menu"
                                        >
                                            <template #title>
                                                <folder-outlined />
                                                分类
                                            </template>
                                            <a-menu-item>分类1</a-menu-item>
                                            <a-menu-item>分类2</a-menu-item>
                                        </a-sub-menu>
                                        <a-menu-item>
                                            <setting-outlined />
                                            设置
                                        </a-menu-item>
                                    </a-menu>
                                </template>
                            </a-dropdown>
                        </div>
                    </div>
                    <div class="title">
                        {{ item.description }}
                    </div>
                </li>
            </ul>
        </div>
    </a-layout-content>
</template>
<script>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import {
    PlusOutlined,
    EllipsisOutlined,
    FormOutlined,
    DeleteOutlined,
    CopyOutlined,
    FolderOutlined,
    SettingOutlined,
    FilterOutlined,
    ApartmentOutlined
} from '@ant-design/icons-vue';

export default {
    name: 'db-standard',
    components: {
        PlusOutlined,
        EllipsisOutlined,
        FormOutlined,
        DeleteOutlined,
        CopyOutlined,
        FolderOutlined,
        SettingOutlined,
        FilterOutlined,
        ApartmentOutlined
    },
    setup() {
        const router = useRouter();
        const store = useStore();

        const list = computed(() => store.getters['standard/list']);

        const handleBuilding = ({ id }) => {
            console.log('item', id);
            router.push({
                name: 'building',
                params: {
                    id
                }
            });
        };

        return {
            list,
            handleBuilding
        };
    }
};
</script>

<style scoped lang="scss">
.page-standard {
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

            &:hover {
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
</style>

<style>
.class-sub-menu {
    width: 100px;
}
</style>
