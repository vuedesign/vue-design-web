<template>
    <div class="design-component">
        <design-panel-bar :title="title">
            <dd v-if="currentComponent === 'add'" @click="handleBackList">
                <i class="el-icon-back" />
                <span>返回</span>
            </dd>
            <dd v-else @click="handleAdd"><vue-design-iconfont type="folder-add" /></dd>
        </design-panel-bar>
        <design-panel-main>
            <component :is="currentComponent" @cancel="handleBackList" />
            module
        </design-panel-main>
    </div>
</template>

<script>
import DesignPanelBar from '@modules/design/components/DesignPanelBar';
import DesignPanelMain from '@modules/design/components/DesignPanelMain';
import DesignModuleAdd from './Add';
import DesignModuleList from './List';

export default {
    name: 'design-component',
    components: {
        DesignPanelBar,
        DesignPanelMain,
        add: DesignModuleAdd,
        list: DesignModuleList
    },
    data() {
        return {
            visible: false,
            currentComponent: 'list'
        };
    },
    computed: {
        title() {
            let titleList = ['组件列表'];
            if (this.currentComponent === 'add') {
                titleList.push('添加');
            }
            return titleList.join('/');
        }
    },
    methods: {
        handleBackList() {
            this.currentComponent = 'list';
        },
        handleAdd() {
            this.currentComponent = 'add';
        }
    }
};
</script>

<style lang="scss" scope>
    .design-component{
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
    }
</style>
