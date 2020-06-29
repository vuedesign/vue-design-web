<template>
    <header class="design-header">
        <div class="design-header-left">
            <div class="design-header-project">
                <el-dropdown @command="handleCommand">
                    <div class="design-header-project-label">
                        <vue-design-iconfont type="manage" />
                        <span class="text" v-if="detail">{{ detail.description }}</span>
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
            <div class="btn-toggle" @click="handleOpen">
                <vue-design-iconfont type="menu" />
            </div>
        </div>
        <div class="design-header-main">
            <vue-design-breadcrumb />
        </div>
        <el-drawer
            :append-to-body="false"
            :with-header="false"
            :visible.sync="drawer"
            direction="ltr"
            size="280px"
            :before-close="handleClose">
            <design-module />
        </el-drawer>
    </header>
</template>

<script>
import { mapGetters } from 'vuex';
import DesignModule from '../children/module/pages/Index';

export default {
    name: 'design-header',
    components: {
        DesignModule
    },
    data() {
        return {
            drawer: false
        };
    },
    computed: {
        ...mapGetters('project', [
            'list',
            'detail',
            'currentProjectUuid'
        ])
    },
    created() {
        const uuid = this.$route.params.uuid;
        this.$store.dispatch('project/find');
        this.checkProject(uuid);
    },
    methods: {
        async checkProject(uuid) {
            this.$store.commit('project/CURRENT_PROJECT_UUID', uuid);
            await this.$store.dispatch('project/findOne', uuid);
            this.$store.commit('design/module/FILTER', {
                projectId: this.detail.id
            });
            await this.$store.dispatch('design/module/find');
        },
        handleOpen() {
            this.drawer = !this.drawer;
            this.addVisible = false;
        },
        handleClose(done) {
            done();
        },
        handleCommand(uuid) {
            this.checkProject(uuid);
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
        display: flex;
    }

    .design-header-main {
        flex: 1;
    }

    .design-header-project {
        flex: 1;
    }

    .design-header-project-label {
        height: 18px;
        line-height: 18px;
        cursor: pointer;

        .text {
            margin-left: 5px;
        }
    }

    .btn-toggle {
        cursor: pointer;
        color: #666;
    }
</style>
