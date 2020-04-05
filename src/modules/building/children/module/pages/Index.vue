<template>
    <div class="generator-module">
        <vued-filter>
            <ul class="left">
                <li><el-button type="primary" size="small" @click="handleAddClick">新增</el-button></li>
            </ul>
        </vued-filter>
        <el-table
            :data="moduleList"
            style="width: 100%">
            <el-table-column
                prop="icon"
                label="模块图标"
                min-width="80">
                <template slot-scope="scope">
                    <vued-iconfont :type="scope.row.icon" />
                </template>
            </el-table-column>
            <el-table-column
                prop="name"
                label="模块名称"
                min-width="120">
            </el-table-column>
            <el-table-column
                prop="label"
                label="模块描述"
                min-width="120">
            </el-table-column>
            <el-table-column
                prop="parentName"
                label="所属模块组"
                min-width="120">
            </el-table-column>
            <el-table-column
                label="操作"
                width="80"
                align="center"
            >
                <template slot-scope="scope">
                    <el-button
                        @click="handleDelClick(scope.row.name)"
                        type="text"
                        size="small">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    name: 'generator-module',
    data() {
        return {};
    },
    computed: {
        ...mapGetters('generator/module', [
            'list'
        ]),
        moduleList() {
            let list = [];
            this.list.forEach(item => {
                if (item.type === 'module') {
                    let moduleItem = Object.assign({}, item, {
                        parentName: 'root'
                    });
                    list.push(moduleItem);
                } else {
                    if (item.type === 'folder' && item.children && item.children.length > 0) {
                        item.children.forEach(subItem => {
                            let moduleItem = Object.assign({}, subItem, {
                                parentName: item.name
                            });
                            list.push(moduleItem);
                        });
                    }
                }
            });
            return list;
        }
    },
    created() {
        this.$store.dispatch('generator/module/find');
    },
    methods: {
        handleAddClick() {
            this.$router.push({
                name: 'generator-module-add-base',
                query: {
                    folderName: 'root'
                }
            });
        },
        handleDelClick() {}
    }
};
</script>

<style lang="scss">
    .generator-module{
        padding:0 16px 16px;
    }
</style>
