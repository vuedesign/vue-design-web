<style lang="scss">
</style>

<template>
    <div class="users-group-update">
        <el-dialog
            title="提示"
            :visible.sync="dialogVisible"
            width="60%"
            :before-close="handleClose">
            <span>这是一段信息</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="handleCancel">取 消</el-button>
                <el-button type="primary" @click="handleCancel">确 定</el-button>
              </span>
        </el-dialog>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
    data() {
        return {
            createBabel: '新增用户',
            dialogVisible: true
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
            this.$confirm('确认关闭？')
                .then(_ => {
                    this.$router.push({ name: 'users-group' });
                    done();
                })
                .catch(_ => {});
        },
        handleCancel() {
            this.$router.push({ name: 'users-group' });
        }
    }
};
</script>
