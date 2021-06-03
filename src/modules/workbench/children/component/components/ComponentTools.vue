<template>
    <layout-panel
        class="wrokbench-component-tools"
        :title="`组件 (${currentComponenttotal})`"
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
        <div class="wrokbench-component-tools-content">
            <!-- <plugin-drop-handler-list /> -->
            <vd-collapse
                v-for="item in componentList"
                :key="item.value"
                v-model:is-active="item.isActive"
                :title="item.label"
                :item-num="item.children && item.children.length"
            >
                <ul
                    v-if="item.children && item.children.length"
                    :id="item.name"
                    class="component-list"
                >
                    <li
                        v-for="child in item.children"
                        :key="child.name"
                        :data-id="child.name"
                        :draggable="child.draggable"
                        @dragstart="handleDragstart"
                        @drag="handleDrag"
                        @dragend="handleDragend"
                    >
                        <span>{{ child.name }}</span>
                        <span class="title">{{ child.label }}</span>
                    </li>
                </ul>
            </vd-collapse>
        </div>
    </layout-panel>
</template>

<script>
import { computed, ref, defineComponent } from 'vue';
import VdCollapse from '@/modules/globals/components/VdCollapse.vue';
import LayoutPanel from '@/modules/workbench/components/LayoutPanel.vue';
import { TOOL_TREE } from '../constants';
import pluginList from '@/modules/plugins/list';
import {
    FileSearchOutlined,
} from '@ant-design/icons-vue';

const categoryMap = [
    {
        value: "common",
        label: "通用",
        isActive: true
    },
    {
        value: "layout",
        label: "布局",
        isActive: true
    }
];

export default defineComponent({
    name: 'component-tools',
    components: {
        LayoutPanel,
        VdCollapse,
        FileSearchOutlined
    },
    setup() {
        // const pluginListData = ref(pluginList());
        const search = ref('');
        const componentList = ref(pluginList(categoryMap));

        const currentComponenttotal = computed(() => {
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

        const handleDragstart = (event) => {
            event.currentTarget.style.backgroundColor = 'rgba(24, 144, 255, .1)';
            event.dataTransfer.setData('text', event.target.dataset.id);
            event.dataTransfer.effectAllowed = 'copy';
        };

        const handleDrag = (event) => {
            event.preventDefault();
            event.currentTarget.style.backgroundColor = 'rgba(24, 144, 255, .1)';
        };

        const handleDragend = (event) => {
            event.preventDefault();
            event.currentTarget.style.backgroundColor = 'transparent';
        };

        return {
            toolTree: TOOL_TREE,
            search,
            handleSearch,
            componentList,
            currentComponenttotal,
            handleDragstart,
            handleDrag,
            handleDragend
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
</style>
