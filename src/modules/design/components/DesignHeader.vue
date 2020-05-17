<template>
    <header class="design-header">
        <div class="design-header-left">
            <el-dropdown @command="handleCommand">
                <div class="design-header-project">
                    <vue-design-iconfont type="manage" />
                    <span class="text">{{ projectDetail.description }}</span>
                    <i class="el-icon-arrow-down el-icon--right"></i>
                </div>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item
                        v-for="item in list"
                        :key="item.uuid"
                        :command="item.uuid"
                        :disabled="item.uuid === currentProjectUuid"
                    >{{ item.description }}</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
        <div class="design-header-main">
            <vue-design-breadcrumb />
        </div>
    </header>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    name: 'design-header',
    computed: {
        ...mapGetters('project', [
            'list'
        ]),
        projectDetail() {
            return this.list.find(item => item.uuid === this.currentProjectUuid);
        }
    },
    data() {
        return {
            currentProjectUuid: this.$route.params.uuid
        };
    },
    created() {
        this.$store.dispatch('project/find');
    },
    methods: {
        handleCommand(uuid) {
            this.currentProjectUuid = uuid;
            this.$router.push({
                name: 'project-design',
                params: {
                    uuid
                }
            });
        }
    }
};
</script>

<style lang="scss" scope>
    .design-header {
        height: 40px;
        width: 100%;
        display: flex;
    }

    .design-header-left {
        width: 280px;
        padding: 0 8px;
        padding-top: 10px;
    }

    .design-header-project {
        height: 18px;
        line-height: 18px;
        cursor: pointer;

        .text {
            margin-left: 5px;
        }
    }
</style>
