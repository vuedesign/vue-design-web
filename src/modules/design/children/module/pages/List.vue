<template>
    <div class="design-module-list">
        <template v-if="listTree && listTree.length">
            <el-tree
                :data="listTree"
                :props="defaultProps"
                @node-click="handleNodeClick"
                default-expand-all
            >
                <span class="custom-tree-node" slot-scope="{ node, data }" :class="{ 'module': data.type === 'module' }">
                    <span class="custom-tree-node-icon"><vue-design-iconfont :type="getFolderIcon(node.expanded, data.type)" /></span>
                    <span class="custom-tree-node-title">{{ node.label }}</span>
                    <span class="custom-tree-node-btn-add" v-if="data.children">
                        <vue-design-iconfont type="add" @click="() => append(data)" />
                    </span>
                    <span class="custom-tree-node-btn-del" v-if="!data.children">
                        <vue-design-iconfont type="trash" @click="() => remove(node, data)" />
                    </span>
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
            'listTree'
        ])
    },
    data() {
        return {
            dialogVisible: false,
            defaultProps: {
                label: 'name'
            }
        };
    },
    methods: {
        handleNodeClick(data, node) {
            console.log('handleNodeClick', data, node);
        },
        getFolderIcon(expanded, type) {
            if (type === 'file') {
                return 'document';
            }
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
        overflow-x: hidden;
        overflow-y: auto;
    }
    .custom-tree-node-icon {
        i {
            color: #666;
        }
    }
    .custom-tree-node {
        display: flex;
        width: 100%;
        &.module {
            .custom-tree-node-icon {
                i {
                    color: #409EFF;
                }
            }
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
