<style lang="scss">
</style>

<template>
    <div class="user">
        user
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
    data() {
        return {
            createBabel: '新增用户'
        };
    },
    computed: {
        ...mapGetters('users', {
            filters: 'userFilters',
            columns: 'userColumns',
            data: 'userData',
            total: 'userTotal'
        })
    },
    created() {
        this.$store.dispatch('users/getUserData');
    },
    methods: {
        handleCreate() {
            this.$store.commit('users/USER_DATA', {
                key: 'show',
                value: true
            });
            this.$store.commit('users/USER_DATA', {
                key: 'title',
                value: this.createBabel
            });
        }
    }
};
</script>
