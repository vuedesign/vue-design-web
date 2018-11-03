<template>
    <div class="users-user-list">
        <vued-filter>
            <ul class="left">
                <li>
                    <el-button v-if="actionOf('ADD')" type="primary" size="small" @click="handleAddClick">新增</el-button>
                </li>
            </ul>
            <ul class="right">
                <li>
                    <el-input type="text" v-focus size="small"></el-input>
                </li>
            </ul>
        </vued-filter>
        <el-table
            :data="data"
            style="width: 100%; border-radius: 3px;">
            <el-table-column
                prop="name"
                label="姓名"
                width="180">
            </el-table-column>
            <el-table-column
                prop="address"
                label="地址">
            </el-table-column>
            <el-table-column
                prop="date"
                label="日期"
                width="180">
            </el-table-column>
            <el-table-column
                fixed="right"
                label="操作"
                width="100">
                <template slot-scope="scope">
                    <el-button v-if="actionOf('VIEW')" @click="handleViewClick(scope.row)" type="text" size="small">查看</el-button>
                    <el-button v-if="actionOf('EDIT')" @click="handleEditClick(scope.row)" type="text" size="small">编辑</el-button>
                    <el-button v-if="actionOf('DELETE')"  @click="handleDelClick(scope.row)" type="text" size="small">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <vued-pagination>
            <el-pagination
                background
                layout="prev, pager, next"
                :total="1000">
            </el-pagination>
        </vued-pagination>
        <router-view />
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import VuedFilter from '@/components/layouts/VuedFilter';
import VuedPagination from '@/components/layouts/VuedPagination';

export default {
    components: {
        VuedFilter,
        VuedPagination
    },
    data() {
        return {};
    },
    computed: {
        ...mapGetters('users/user', [
            'filters',
            'data',
            'total'
        ])
    },
    created() {
        this.$store.dispatch('users/user/find');
    },
    methods: {
        handleAddClick() {
            this.$router.push({ name: 'users-user-add' });
        },
        handleEditClick({ id }) {
            this.$router.push({ name: 'users-user-edit', params: { id } });
        },
        handleDelClick({ id }) {
            // this.$router.push({ name: 'users-user-update' });
        },
        handleViewClick({ id }) {
            this.$router.push({ name: 'users-user-view', params: { id } });
        }
    }
};
</script>

<style lang="scss">

</style>
