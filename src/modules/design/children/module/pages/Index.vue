<template>
    <div class="design-module">
        <design-title-bar :title="title">
            <dd v-if="currentComponent === 'add'" @click="handleBackList">
                <i class="el-icon-back" />
                <span>返回</span>
            </dd>
            <dd v-else @click="handleAdd"><vue-design-iconfont type="folder-add" /></dd>
        </design-title-bar>
        <design-panel-main>
            <component :is="currentComponent" @cancel="handleBackList" />
        </design-panel-main>
    </div>
</template>

<script>
import DesignTitleBar from '../components/DesignTitleBar';
import DesignPanelMain from '@modules/design/components/DesignPanelMain';
import DesignModuleAdd from './Add';
import DesignModuleList from './List';

export default {
    name: 'design-module',
    components: {
        DesignTitleBar,
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
    created() {
        console.log('ddd');
        // this.$store.commit('design/module/FILTER', {
        //     projectId: 
        // });
        // this.$store.dispatch('design/module/find');
    },
    computed: {
        title() {
            let titleList = ['模块列表'];
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
    .design-module{
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        overflow: hidden;
    }
</style>
