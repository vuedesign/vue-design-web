<style lang="scss">
</style>

<template>
    <div class="generator-pages-view">
        <el-dialog
            title="查看"
            width="60%"
            :visible="true"
            :before-close="handleClose">
            generator-pages-view
        </el-dialog>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
    name: 'generator-pages-view',
    data() {
        return {
            formData: {
                name: '',
                region: '',
                date1: '',
                date2: '',
                delivery: false,
                type: [],
                resource: '',
                desc: ''
            }
        };
    },
    computed: {
        ...mapGetters('users/group', {
        })
    },
    created() {
        this.$store.dispatch('users/group/findOne', {
            groupId: 2
        });
    },
    methods: {
        handleClose(done) {
            this.$router.push({ name: 'generator-pages' });
        },
        handleCancel() {
            this.$router.push({ name: 'generator-pages' });
        },
        handleSubmit() {
            console.log('submit');
        }
    }
};
</script>
