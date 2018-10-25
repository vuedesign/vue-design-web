<template>
    <div class="vued-header">
        <div class="vued-logo">
            <h1>logo</h1>
        </div>
        <vued-breadcrumb slot="breadcrumb"></vued-breadcrumb>
        <div class="vued-nav">
            <el-menu
                :default-active="headerNavActive"
                mode="horizontal"
                @select="handleSelect">
                <el-menu-item
                    v-for="(item, index) in headerLeftNav"
                    :index="item.name"
                    :key="index"
                >{{ item.label }}</el-menu-item>
            </el-menu>
        </div>
    </div>
</template>

<script>
import headerLeftNav from '@/configs/headerLeftNav';
import VuedBreadcrumb from '@/components/servers/VuedBreadcrumb';
export default {
    components: {
        VuedBreadcrumb
    },
    data() {
        return {
            headerNavActive: 'users',
            headerLeftNav
        };
    },
    methods: {
        handleSelect() {

        }
    }
};
</script>

<style lang="scss">
    .vued-header{
        height: 100%;
        // background-color: #409EFF;
        background-color: #fff;
        // box-shadow: 0 1px 1px rgba(0,0,0,.1);
        border-bottom: 1px solid #ddd;
    }
    .vued-logo{
        height: 100%;
        float: left;
        text-align: center;
        min-width: 200px;
        h1{
            display: inline-block;
            font-size: 20px;
            padding: 10px 20px 0 20px;
            color: #333;
            font-weight: 700;
        }
    }
    .vued-nav{
        float: left;
        .el-menu--horizontal>.el-menu-item{
            height: 48px;
            line-height: 48px;
        }
        .el-menu.el-menu--horizontal{
            border: none;
        }
        .el-menu{
            background-color: transparent;
        }
        .el-menu--horizontal>.el-menu-item.is-active {
            border-bottom: 3px solid #fff;
            color: #fff;
            font-weight: 700;
        }
        .el-menu--horizontal>.el-menu-item:not(.is-disabled):hover{
            background-color: rgba(255, 255, 255, .1);
        }
    }
</style>
