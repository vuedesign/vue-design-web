<template>
    <vued-admin-body>
        <aside-menu slot="asideMenu" />
        <vued-breadcrumb slot="breadcrumb" />
        dashboard content
    </vued-admin-body>
</template>

<script>
import { mapGetters } from 'vuex';
import AsideMenu from './components/AsideMenu';

export default {
    components: { AsideMenu },
    data() {
        return {
            createBabel: '新增用户组'
        };
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
        handleClick() {
            this.$router.push({ name: 'operate-activity-update' });
        }
    }
};
</script>

<style lang="scss">
    .dashboard-list{
        height: 100%;
        overflow: hidden;
        width: 100%;
    }
</style>
