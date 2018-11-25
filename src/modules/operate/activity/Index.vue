<template>
    <div class="operate-activity-list">
        <vued-filter>
            <ul class="left">
                <li><el-button type="primary" size="small" @click="handleAddClick">新增</el-button></li>
            </ul>
            <ul class="right">
                <li><el-input type="text" size="small" /></li>
            </ul>
        </vued-filter>
        <el-table
            size="medium"
            :data="list"
            style="width: 100%; border-radius: 3px;">
            <el-table-column label="缩略图" min-width="64" >
                <template slot-scope="scope">
                    <span><img :src="scope.row.thumb" /></span>
                </template>
            </el-table-column>
            <el-table-column prop="name" label="活动名称" min-width="120" />
            <el-table-column prop="region" label="活动区域" min-width="120" />
            <el-table-column prop="date" label="活动时间" min-width="180">
                <template slot-scope="scope">
                    {{ scope.row.date }} {{ scope.row.time }}
                </template>
            </el-table-column>
            <el-table-column prop="delivery" label="即时配送"></el-table-column>
            <el-table-column prop="type" label="活动性质"></el-table-column>
            <el-table-column prop="resource" label="特殊资源"></el-table-column>
            <el-table-column prop="desc" label="活动形式"></el-table-column>
            <el-table-column fixed="right" label="操作" width="140">
                <template slot-scope="scope">
                    <el-button @click="handleViewClick(scope.row)" type="text" size="small">查看</el-button>
                    <el-button @click="handleEditClick(scope.row)" type="text" size="small">编辑</el-button>
                    <el-button @click="handleDelClick(scope.row)" type="text" size="small">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <vued-pagination>
            <el-pagination
                background
                :page-size="filters.pageSize"
                :current-page="filters.page"
                layout="prev, pager, next"
                :total="total">
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
        return {
            params: this.$route.params
        };
    },
    computed: {
        ...mapGetters('operate/activity', [
            'filters',
            'list',
            'total'
        ])
    },
    watch: {
        filters: {
            handler(nv, ov) {
                this.$store.dispatch('operate/activity/find');
            },
            deep: true
        }
    },
    created() {
        this.$store.commit('users/group/FILTERS', {
            page: Number(this.params.page)
        });
        this.$store.dispatch('operate/activity/find');
    },
    methods: {
        handleAddClick() {
            this.$router.push({ name: 'operate-activity-add' });
        },
        handleEditClick({ id }) {
            this.$router.push({ name: 'operate-activity-edit', params: { id } });
        },
        handleDelClick({ id }) {
            // this.$router.push({ name: 'operate-activity-update' });
        },
        handleViewClick({ id }) {
            this.$router.push({ name: 'operate-activity-view', params: { id } });
        }
    }
};
</script>

<style lang="scss">

</style>
