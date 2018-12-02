<template>
    <div class="generator-folder">
        <vued-filter>
            <ul class="left">
                <li><el-button type="primary" size="small" @click="handleAddClick">新增</el-button></li>
            </ul>
        </vued-filter>
        <el-table
            :data="folderList"
            style="width: 100%">
            <el-table-column
                prop="icon"
                label="模块组图标"
                min-width="100">
                <template slot-scope="scope">
                    <vued-iconfont :type="scope.row.icon" />
                </template>
            </el-table-column>
            <el-table-column
                prop="name"
                label="模块组名称"
                min-width="120">
            </el-table-column>
            <el-table-column
                prop="label"
                label="模块组描述"
                min-width="180">
            </el-table-column>
            <el-table-column
                label="操作"
                width="120"
                align="center"
            >
                <template slot-scope="scope">
                    <el-button
                        @click="handleDelClick(scope.row.name)"
                        type="text"
                        size="small">删除</el-button>
                    <el-button
                        @click="handleAddModuleClick(scope.row.name)"
                        type="text"
                        size="small">添加模块</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    name: 'generator-folder',
    data() {
        return {};
    },
    computed: {
        ...mapGetters('generator/modules', [
            'list',
            'total'
        ]),
        folderList() {
            return this.list.filter(item => item.type === 'folder');
        }
    },
    created() {
        this.$store.dispatch('generator/modules/find');
    },
    methods: {
        handleAddClick() {
            this.$router.push({
                name: 'generator-folder-add'
            });
        },
        handleAddModuleClick(name) {
            this.$router.push({
                name: 'generator-module-add',
                query: {
                    folderName: name
                }
            });
        }
    }
};
</script>

<style lang="scss">
    .generator-folder{
        padding: 10px;
    }
</style>
