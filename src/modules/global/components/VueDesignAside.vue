<template>
    <div class="vue-design-aside">
        <div class="vue-design-aside-menu">
            <el-menu
                :default-active="asideActive"
                class="vue-design-aside-menu-vertical"
                :collapse="isCollapse"
                @open="handleOpen"
                @close="handleClose"
                @select="handleSelect"
            >
                <template v-for="(item, key) in asideMenu">
                    <el-submenu
                        v-if="item.children"
                        :index="item.name"
                        :key="key"
                    >
                        <template slot="title">
                            <vue-design-iconfont :type="item.icon" />
                            <span>{{ item.label }}</span>
                        </template>
                        <el-menu-item
                            v-for="(subItem, subKey) in item.children"
                            :key="subKey"
                            :index="subItem.name">
                            <template slot="title">
                                <vue-design-iconfont :type="subItem.icon" />
                                <span>{{ subItem.label }}</span>
                            </template>
                        </el-menu-item>
                    </el-submenu>
                    <el-menu-item v-else :index="item.name" :key="key">
                        <vue-design-iconfont :type="item.icon" />
                        <span slot="title">{{ item.label }}</span>
                    </el-menu-item>
                </template>
            </el-menu>
        </div>
        <div class="btn-collapse">
            <i :class="collapseIcon" @click="handleCollapseClick"></i>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
    name: 'vue-design-aside',
    data() {
        return {
            isCollapse: true
        };
    },
    computed: {
        ...mapGetters('global', [
            'asideMenu',
            'asideActive'
        ]),
        collapseIcon() {
            return this.isCollapse ? 'el-icon-d-arrow-right' : 'el-icon-d-arrow-left';
        }
    },
    created() {
        this.$store.dispatch('global/findMenu');
        this.$store.commit('global/ASIDE_ACTIVE', this.$route.matched[1].name);
    },
    methods: {
        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        },
        handleCollapseClick() {
            this.isCollapse = !this.isCollapse;
        },
        handleSelect(index) {
            this.$router.push({
                name: index,
                params: {
                    page: 1
                }
            });
        }
    }
};
</script>

<style lang="scss">
    .vue-design-aside{
        height: 100%;
        width: auto;
        background-color: #409EFF;
        position: relative;
    }
    .vue-design-aside-menu-vertical{
        width: 100px;
        &.el-menu,
        .el-menu{
            border: 0;
            background-color: transparent;
        }
        &.el-menu--collapse{
            width: 40px;
        }
        .el-menu-item{
            span{
                color: #fff;
            }
            &.is-active {
                font-weight: 700;
                background-color: #eef5f9;
                span,
                i{
                    color: #409EFF;
                }
            }
            &:hover{
                color: #409EFF;
            }
        }
        & > .el-menu-item,
        & > .el-submenu > .el-submenu__title{
            height: 40px;
            line-height: 40px;
            padding: 0 11px !important;
        }
        & > .el-menu-item > .el-tooltip {
            padding: 0 11px !important;
        }
        .el-menu-item i{
            color: #fff;
        }
        .el-menu-item:focus,
        .el-menu-item:hover {
            background-color: #57aaff;
            i{
                // font-size: 18px;
            }
            &.is-active {
                background-color: #eef5f9;
            }
        }
    }
    .vue-design-aside-menu{
        overflow-x: hidden;
        height: 100%;
    }
    .btn-collapse{
        position: absolute;
        width: 100%;
        bottom: 0;
        left: 0;
        height: 40px;
        line-height: 40px;
        text-align: center;
        i{
            cursor: pointer;
            color: #eef5f9
        }
    }
</style>
