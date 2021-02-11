<template>
    <layout-panel
        class="building-page-tools"
        title="页面"
    >
        <template v-slot:tools>
            <li class="btn-item">
                <folder-add-outlined />
            </li>
            <li class="btn-item">
                <plus-square-outlined />
            </li>
        </template>
        <a-directory-tree
            multiple
            default-expand-all
            @select="handleSelect"
            @expand="handleExpand"
        >
            <a-tree-node
                key="0-0"
                title="parent 0"
                class="page-tree--------"
            >
                <a-tree-node
                    key="0-0-0"
                    title="leaf 0-0"
                    is-leaf
                    class="page-tree"
                />
                <a-tree-node
                    key="0-0-1"
                    title="leaf 0-1"
                    is-leaf />
            </a-tree-node>
            <a-tree-node key="0-1" title="parent 1">
                <a-tree-node
                    key="0-1-0"
                    title="leaf 1-0"
                    is-leaf />
                <a-tree-node
                    key="0-1-1"
                    title="leaf 1-1"
                    is-leaf />
            </a-tree-node>
        </a-directory-tree>
    </layout-panel>
</template>

<script>
import LayoutPanel from '@modules/building/components/LayoutPanel';
import {
    FolderAddOutlined,
    PlusSquareOutlined
} from '@ant-design/icons-vue';

export default {
    components: {
        LayoutPanel,
        FolderAddOutlined,
        PlusSquareOutlined,
    },
    name: 'page-tools',
    setup() {
        const handleSelect = (keys, event) => {
            console.log('Trigger Select', keys, event);
        };

        const handleExpand = () => {
            console.log('Trigger Expand');
        };

        return {
            handleSelect,
            handleExpand
        };
    }
};
</script>

<style lang="scss" scoped>
.building-page-tools {
    background-color: transparent;
    position: relative;
}

</style>
