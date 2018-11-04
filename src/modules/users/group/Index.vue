
<template>
    <div class="users-group-list">
        <vued-filter>
            <ul class="left">
                <li>
                    <el-button v-if="actionOf('ADD')" type="primary" size="small" @click="handleAddClick">新增</el-button>
                </li>
            </ul>
            <ul class="right">
                <li>
                    <el-input type="text" v-model="name" size="small"></el-input>
                </li>
            </ul>
        </vued-filter>
        <el-table
            :data="data"
            style="width: 100%;border-radius: 3px;">
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
                @current-change="handleCurrentChange"
                :current-page="filters.page"
                background
                layout="prev, pager, next"
                :total="total">
            </el-pagination>
        </vued-pagination>
        <router-view />
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { filtersCommit } from '@/vued';
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
        ...mapGetters('users/group', [
            'filters',
            'data',
            'total'
        ]),
        name: filtersCommit('users/group', 'name')
    },
    watch: {
        filters: {
            handler(nv, ov) {
                this.$store.dispatch('users/group/find');
                this.$router.push({
                    params: Object.assign({}, nv)
                });
            },
            deep: true
        }
    },
    created() {
        this.$store.commit('users/group/FILTERS', {
            page: Number(this.$route.params.page)
        });
        this.$store.dispatch('users/group/find');
    },
    methods: {
        handleAddClick() {
            this.$router.push({ name: 'users-group-add' });
        },
        handleEditClick({ id }) {
            this.$router.push({ name: 'users-group-edit', params: { id } });
        },
        handleDelClick({ id }) {
            // this.$router.push({ name: 'users-group-update' });
        },
        handleViewClick({ id }) {
            this.$router.push({ name: 'users-group-view', params: { id } });
        },
        handleCurrentChange(page) {
            this.$store.commit('users/group/FILTERS', { page });
            this.$router.push({ params: { page } });
        }
    }
};
</script>

<style lang="scss">
</style>
