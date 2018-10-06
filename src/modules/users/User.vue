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
        ...mapGetters({
            filters: 'users/userFilters',
            columns: 'users/userColumns',
            data: 'users/userData',
            total: 'users/userTotal'
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
