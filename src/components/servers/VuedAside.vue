<template>
    <div class="vued-aside">
        <div class="vued-aside-menu">
            <el-menu
                default-active="group"
                class="vued-aside-menu-vertical"
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
                            <i :class="item.icon"></i>
                            <span>{{ item.label }}</span>
                        </template>
                        <el-menu-item
                            v-for="(subItem, subKey) in item.children"
                            :key="subKey"
                            :index="subItem.name">
                            <span slot="title">{{ subItem.label }}</span>
                        </el-menu-item>
                    </el-submenu>
                    <el-menu-item v-else :index="item.name" :key="key">
                        <i :class="item.icon"></i>
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
    data() {
        return {
            isCollapse: false
        };
    },
    computed: {
        ...mapGetters([
            'menu',
            'asideMenu',
            'headerMenuActive'
        ]),
        collapseIcon() {
            return this.isCollapse ? 'el-icon-d-arrow-right' : 'el-icon-d-arrow-left';
        }
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
        handleSelect(index, indexPath) {
            let name = indexPath.join('-');
            if (this.headerMenuActive) {
                name = [this.headerMenuActive].concat(indexPath).join('-');
            }
            this.$router.push({
                name
            });
        }
    }
};
</script>

<style lang="scss">
    .vued-aside{
        height: 100%;
        // border-right: 1px solid #f5f5f5;
        .el-menu-item, .el-submenu__title{
            height: 48px;
            line-height: 48px;
        }
    }
    .vued-aside-menu-vertical{
        width: 200px;
        &.el-menu{
            border: 0;
        }
        &.el-menu--collapse{
            width: 64px;
        }
    }
    .vued-aside-menu{
        overflow-x: hidden;
        height: 100%;
    }
    .btn-collapse{
        position: absolute;
        width: 100%;
        bottom: 0;
        left: 0;
        height: 32px;
        line-height: 32px;
        border-top: 1px solid #eee;
        text-align: center;
        i{
            cursor: pointer;
            color: #aaa;
        }
    }
</style>
