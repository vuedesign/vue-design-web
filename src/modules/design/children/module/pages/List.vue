<template>
    <div class="design-module-list">
        <template v-if="listTree && listTree.length">
            <el-tree :data="listTree" :props="defaultProps" @node-click="handleNodeClick">
                <span class="custom-tree-node" slot-scope="{ node, data }">
                    <span class="custom-tree-node-icon"><vue-design-iconfont :type="getFolderIcon(node.expanded)" /></span>
                    <span class="custom-tree-node-title">{{ node.label }}</span>
                    <span class="custom-tree-node-btn-add"><vue-design-iconfont type="add" @click="() => append(data)" /></span>
                    <span class="custom-tree-node-btn-del"><vue-design-iconfont type="trash" @click="() => remove(node, data)" /></span>
                </span>
            </el-tree>
        </template>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    name: 'design-module-list',
    props: {
        visible: {
            type: Boolean
        }
    },
    computed: {
        ...mapGetters('design/module', [
            'list',
            'listTree'
        ])
    },
    data() {
        return {
            dialogVisible: false,
            defaultProps: {
                label: 'description'
            }
        };
    },
    methods: {
        handleNodeClick(data, node) {
            console.log('handleNodeClick', data, node);
        },
        getFolderIcon(expanded) {
            return expanded ? 'folder-open' : 'folder';
        }
    }
};
</script>

<style lang="scss" scope>
    .design-module-list{
        height: 100%;
        padding: 0;
        background-color: #f9f9f9;
    }
    .custom-tree-node {
        display: flex;
        width: 100%;
    }
    .custom-tree-node-icon {
        i {
            color: #409EFF;
        }
    }
    .custom-tree-node-title {
        flex: 1;
        padding-left: 4px;
    }
    .custom-tree-node-btn-add,
    .custom-tree-node-btn-del {
        width: 24px;
        i {
            font-size: 14px;
            color: #999;
        }
    }
</style>
