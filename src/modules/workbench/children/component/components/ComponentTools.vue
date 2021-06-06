<template>
    <layout-panel
        class="wrokbench-component-tools"
        :title="`组件 (${currentComponentTotal})`"
    >
        <!-- <template #tools>
            <li class="btn-item">
                <folder-add-outlined />
            </li>
        </template> -->
        <div class="wrokbench-component-tools-search">
            <a-input
                ref="userNameInput"
                v-model:value="search"
                placeholder="查找组件"
                size="small"
                @change="handleSearch"
            >
                <template #prefix>
                    <file-search-outlined />
                </template>
            </a-input>
        </div>
        <div v-if="componentList && componentList.length" class="wrokbench-component-tools-content">
            <a-collapse
                v-model:activeKey="activeKey"
                expand-icon-position="right"
                :bordered="false"
            >
                <template #expandIcon="{ isActive }">
                    <caret-right-outlined :rotate="isActive ? 90 : 0" />
                </template>
                <a-collapse-panel
                    v-for="item in componentList"
                    :key="item.value"
                    :header="item.label"
                >
                    <draggable
                        :list="item.children"
                        :group="{ name: 'components', pull: 'clone', put: false }"
                        :component-data="{ class: 'handler-list'}"
                        :sort="false"
                        item-key="name"
                        :clone="handleClone"
                        @change="handleLog"
                    >
                        <template #item="{ element }">
                            <div class="handler-item">
                                <component :is="`plugin-${element.name}-handler`" :config="element" />
                            </div>
                        </template>
                    </draggable>
                </a-collapse-panel>
            </a-collapse>
        </div>
    </layout-panel>
</template>

<script>
import { computed, ref, defineComponent } from 'vue';
import LayoutPanel from '@/modules/workbench/components/LayoutPanel.vue';
import pluginList from '@/modules/plugins/list';
import {
    FileSearchOutlined,
    CaretRightOutlined
} from '@ant-design/icons-vue';

const categoryMap = [
    {
        value: "common",
        label: "通用"
    },
    {
        value: "layout",
        label: "布局"
    },
    {
        value: "form",
        label: "表单"
    }
];

export default defineComponent({
    name: 'component-tools',
    components: {
        LayoutPanel,
        FileSearchOutlined,
        CaretRightOutlined
    },
    setup() {
        const list = ref(pluginList(categoryMap));
        const search = ref();
        const componentList = ref(pluginList(categoryMap));

        const currentComponentTotal = computed(() => {
            let total = 0;
            componentList.value.forEach(item => {
                total += item.children.length;
            });
            return total;
        });

        const handleSearch = (event) => {
            console.log('event', event.target.value);
            const searchValue = event.target.value.toLowerCase();
            if (searchValue === '') {
                componentList.value = pluginList(categoryMap);
                return;
            }
            const list = pluginList(categoryMap);
            componentList.value = list.filter(item => {
                item.children = item.children.filter(i => {
                    return i.name.toLowerCase().indexOf(searchValue) > -1 || i.label.indexOf(searchValue) > -1;
                });
                return item.children.length > 0;
            });
        };

        const activeKey = ref([
            'common',
            'layout',
            // 'form'
        ]);

        const handleClone = (data) => {
            console.log('handleClone', data);
            return data;
        };

        const handleLog = (data) => {
            console.log('handleClone', data);
        };

        return {
            search,
            handleSearch,
            componentList,
            currentComponentTotal,
            handleClone,
            handleLog,
            list,
            activeKey
        };
    }
});
</script>

<style lang="scss" scoped>
.wrokbench-component-tools {
    background-color: #fff;
    position: relative;
}

.wrokbench-component-tools {
    ul.component-list {
        width: 100%;
        padding: 0 8px;
        text-align: center;
        &::after {
            content: '';
            display: block;
            clear: both;
        }
        li {
            width: 100%;
            cursor: pointer;
            position: relative;
            float: left;
            text-align: left;
            padding: 4px 8px;

            span {
                display: inline-block;
                font-size: 14px;
            }

            .title {
                font-size: 12px;
                color: #333;
                line-height: 1.25em;
                padding: 5px 0;
                margin-left: 5px;
            }

            &:hover {
                background-color: rgb(24, 144, 255, .1);
                span {
                    color: #1890ff;
                    font-weight: 700;
                }
            }

            &.active {
                background-color: rgb(24, 144, 255, .1);
                .more {
                    display: block;
                }
            }
        }
    }
}

.wrokbench-component-tools-content {
    flex: 1;
    overflow-x: hidden;
    overflow-y: auto;

    div.handler-list {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
    }

    div.handler-item {
        // float: left;
        width: 100px;
        height: 100px;
        background-color: #f5f5f5;
        margin-bottom: 8px;
    }
}

</style>
<style lang="scss">
.wrokbench-component-tools-search {
    padding: 8px;
    .ant-input {
        background-color: transparent;
        border-color: transparent;
    }
}
.wrokbench-component-tools-content {
    .ant-collapse-borderless {
        background-color: transparent;

        > .ant-collapse-item {
            border-bottom-color: #eee;
        }
    }
}

</style>
