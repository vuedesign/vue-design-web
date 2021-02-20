<template>
    <layout-panel
        class="building-component-tools"
        :title="`组件 (${currentComponenttotal})`"
    >
        <!-- <template #tools>
            <li class="btn-item">
                <folder-add-outlined />
            </li>
        </template> -->
        <div class="building-component-tools-search">
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
        <div class="building-component-tools-content">
            <db-collapse
                v-for="item in componentList"
                :key="item.value"
                v-model:is-active="item.isActive"
                :title="item.label"
                :item-num="item.children && item.children.length"
            >
                <ul
                    v-if="item.children && item.children.length"
                    :id="item.value"
                    class="component-list"
                >
                    <li
                        v-for="child in item.children"
                        :key="child.value"
                        :data-id="child.value"
                        :draggable="child.draggable"
                        @dragstart="handleDragstart"
                        @drag="handleDrag"
                        @dragend="handleDragend"
                    >
                        <span>{{ child.value }}</span>
                        <span class="title">{{ child.label }}</span>
                    </li>
                </ul>
            </db-collapse>
        </div>
    </layout-panel>
</template>

<script>
import { computed, ref, defineComponent } from 'vue';
import { cloneDeep } from 'lodash';
import DbCollapse from '@modules/globals/components/DbCollapse.vue';
import LayoutPanel from '@modules/building/components/LayoutPanel.vue';
import { TOOL_TREE } from '../constants';
import COMPONENT_LIST from '../componentList';
import {
    FileSearchOutlined,
} from '@ant-design/icons-vue';

export default defineComponent({
    name: 'component-tools',
    components: {
        LayoutPanel,
        DbCollapse,
        FileSearchOutlined
    },
    setup() {
        const search = ref('');
        const componentList = ref(cloneDeep(COMPONENT_LIST));

        const currentComponenttotal = computed(() => {
            let total = 0;
            componentList.value.forEach(item => {
                total += item.children.length;
            });
            return total;
        });

        const handleSearch = (event) => {
            console.log('event', event.target.value);
            const searchValue = event.target.value;
            if (searchValue === '') {
                componentList.value = cloneDeep(COMPONENT_LIST);
                return;
            }
            const list = cloneDeep(COMPONENT_LIST);
            componentList.value = list.filter(item => {
                item.children = item.children.filter(i => {
                    return i.value.toLowerCase().indexOf(searchValue) > -1 || i.label.indexOf(searchValue) > -1;
                });
                return item.children.length > 0;
            });
            // console.log('list', list);
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
.building-component-tools {
    background-color: #fff;
    position: relative;
}

.building-component-tools {
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

.building-component-tools-content {
    flex: 1;
    overflow-x: hidden;
    overflow-y: auto;
}

</style>
<style lang="scss">
.building-component-tools-search {
    padding: 8px;
    .ant-input {
        background-color: transparent;
        border-color: transparent;
    }
}
</style>
