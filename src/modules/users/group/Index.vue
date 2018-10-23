<style lang="scss">
</style>

<template>
    <div class="users-group-list">
        <el-button @click="$router.push({ name: 'users-group-update' })">点击打开 Dialog</el-button>
        <el-table
            :data="data"
            style="width: 100%">
            <el-table-column
                prop="date"
                label="日期"
                width="180">
            </el-table-column>
            <el-table-column
                prop="name"
                label="姓名"
                width="180">
            </el-table-column>
            <el-table-column
                prop="address"
                label="地址">
            </el-table-column>
        </el-table>
        <router-view />
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
    data() {
        return {
            createBabel: '新增用户组'
        };
    },
    computed: {
        ...mapGetters('users/group', [
            'filters',
            'data',
            'total'
        ])
    },
    created() {
        this.$store.dispatch('users/group/find');
    },
    methods: {
    }
};
</script>
