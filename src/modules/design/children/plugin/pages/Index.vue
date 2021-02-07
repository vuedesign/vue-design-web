<template>
    <div class="design-plugin">
        <design-panel-bar title="插件列表">
            <dd @click="handleAdd"><vue-design-iconfont type="folder-add" /></dd>
        </design-panel-bar>
        <design-panel-main>
            <div class="design-plugin-list">
                <dl v-for="(item, index) in pluginList" :key="index">
                    <dt>{{ item.htmlTag }}</dt>
                    <dd>{{ item.description }}</dd>
                </dl>
            </div>
        </design-panel-main>
    </div>
</template>

<script>
import DesignPanelBar from '@modules/design/components/DesignPanelBar';
import DesignPanelMain from '@modules/design/components/DesignPanelMain';

export default {
    name: 'design-component',
    components: {
        DesignPanelBar,
        DesignPanelMain
    },
    data() {
        return {
            pluginList: [
                {
                    name: 'filters',
                    htmlTag: 'vd-filters',
                    description: '筛选过滤'
                },
                {
                    name: 'table',
                    htmlTag: 'vd-table',
                    description: '表格'
                },
                {
                    name: 'pag',
                    htmlTag: 'vd-table',
                    description: '翻页'
                }
            ]
        };
    },
    methods: {
    }
};
</script>

<style lang="scss" scope>
    .design-plugin{
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
    }

    .design-plugin-list {
        background-color: #f9f9f9;
        dl {
            padding: 10px;
            border-bottom: 1px solid #eee;
        }
    }
</style>
