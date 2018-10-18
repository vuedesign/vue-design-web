<style lang="scss">
</style>

<template>
    <div class="users-group-list">
        group-list
        <el-button @click="$router.push({ name: 'users-group-update' })">点击打开 Dialog</el-button>
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
        ...mapGetters('users/user', [
            'filters',
            'columns',
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
