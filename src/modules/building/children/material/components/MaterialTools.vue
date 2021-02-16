<template>
    <layout-panel
        class="building-material-tools"
        title="素材"
    >
        <div class="building-material-tools-search">
            <a-input
                ref="userNameInput"
                v-model:value="currentComponent"
                placeholder="查找组件"
                size="small"
            >
                <template #prefix>
                    <file-search-outlined />
                </template>
            </a-input>
        </div>
        <db-collapse
            v-for="item in toolList"
            :key="item.id"
            v-model:is-active="item.isActive"
            :title="item.title"
        >
            <ul
                v-if="item.children && item.children.length"
                :id="item.id"
                class="component-list"
            >
                <li
                    v-for="i in item.children"
                    :key="i.value"
                    :data-id="i.value"
                >
                    <component
                        :is="i.value"
                        class="icon"
                        :style="{
                            fontSize: '24px',
                            color: '#397097'
                        }"
                    />
                    <span class="title">{{ i.label }}</span>
                </li>
            </ul>
        </db-collapse>
    </layout-panel>
</template>

<script>
import { ref, onMounted } from 'vue';
import DbCollapse from '@modules/globals/components/DbCollapse';
import LayoutPanel from '@modules/building/components/LayoutPanel';
import { TOOL_TREE } from '../constants';
import {
    FileSearchOutlined,
    AreaChartOutlined,
    PieChartOutlined,
    BarChartOutlined,
    RadarChartOutlined
} from '@ant-design/icons-vue';
import Sortable from 'sortablejs';

export default {
    name: 'material-tools',
    components: {
        FileSearchOutlined,
        DbCollapse,
        AreaChartOutlined,
        PieChartOutlined,
        BarChartOutlined,
        RadarChartOutlined,
        LayoutPanel
    },
    setup() {
        const currentComponent = ref('');
        const toolList = ref([
            {
                id: 'layout',
                title: '布局',
                isActive: true,
                children: [
                    {
                        icon: 'area-chart-outlined',
                        label: 'area-chart-outlined',
                        value: 'area-chart-outlined'
                    },
                    {
                        icon: 'pie-chart-outlined',
                        label: 'pie-chart-outlined',
                        value: 'pie-chart-outlined'
                    },
                    {
                        icon: 'bar-chart-outlined',
                        label: 'bar-chart-outlined',
                        value: 'bar-chart-outlined'
                    },
                    {
                        icon: 'radar-chart-outlined',
                        label: 'radar-chart-outlined',
                        value: 'radar-chart-outlined'
                    }
                ]
            },
            {
                id: 'form',
                title: '表单',
                isActive: false,
                children: [
                    {
                        icon: 'area-chart-outlined',
                        label: 'area-chart-outlined',
                        value: 'area-chart-outlined'
                    },
                    {
                        icon: 'pie-chart-outlined',
                        label: 'pie-chart-outlined',
                        value: 'pie-chart-outlined'
                    }
                ]
            }
        ]);

        onMounted(() => {
            console.log('toolList', toolList.value);
            toolList.value.forEach(item => {
                const el = document.getElementById(item.id);
                Sortable.create(el, {
                    group: {
                        name: item.id,
                        pull: 'clone'
                    },
                    sort: false
                });
            });
        });

        return {
            toolTree: TOOL_TREE,
            currentComponent,
            toolList
        };
    }
};
</script>

<style lang="scss" scoped>
.building-material-tools {
    background-color: #fff;
    position: relative;

    ul {
        width: 100%;
        text-align: center;
        &::after {
            content: '';
            display: block;
            clear: both;
        }
    }

    li {
        width: 80px;
        height: 80px;
        cursor: pointer;
        position: relative;
        float: left;

        span {
            display: block;
        }

        .title {
            font-size: 12px;
            text-align: center;
            color: #333;
            line-height: 1.25em;
            padding: 5px 0;
        }

        .icon {
            margin-top: 10px;
        }

        &:hover {
            background-color: rgb(24, 144, 255, .1);
        }

        &.active {
            background-color: rgb(24, 144, 255, .1);
            .more {
                display: block;
            }
        }
    }
}

</style>
<style lang="scss">
.building-material-tools-search {
    padding: 8px;
    .ant-input {
        background-color: transparent;
        border-color: transparent;
    }
}
</style>
