<template>
    <div class="vued-header">
        <div class="vued-logo">
            <h1 @click="handleLogo">Vue.Design Admin</h1>
        </div>
        <div class="vued-header-left">
            <ul>
                <li
                    v-for="(item, index) in headerMenu"
                    :index="item.name"
                    :key="index"
                    @click="handleHeaderMenu(item, index)"
                >
                    <i :class="item.icon"></i><span>{{ item.label }}</span>
                </li>
            </ul>
        </div>
        <div class="vued-header-right">
            <ul class="vued-header-nav">
                <li
                    v-for="(item, index) in headerLeftNav"
                    :index="item.name"
                    :key="index"
                    @click="handleHeaderNav(item, index)"
                >
                    <i :class="item.icon"></i><span>{{ item.label }}</span>
                </li>
            </ul>
            <div class="vued-user">
                <span class="avatar"></span>
                <el-dropdown
                    trigger="click"
                    @command="handleCommand">
                   <span class="name">wujian<i class="el-icon-arrow-down el-icon--right"></i>
                   </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item
                            v-for="(item, index) in userDropdown"
                            :key="index"
                            :command="item.name"
                            :divided="item.divided"
                        >{{ item.label }}</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </div>
    </div>
</template>

<script>
import headerLeftNav from '@/configs/headerLeftNav';
import { mapGetters } from 'vuex';
export default {
    data() {
        return {
            headerNavActive: 'users',
            headerLeftNav,
            userDropdown: [
                {
                    name: 'logout',
                    label: '退出'
                },
                {
                    name: 'user-info',
                    label: '用户资料',
                    divided: true
                }
            ]
        };
    },
    computed: {
        ...mapGetters([
            'menu',
            'headerMenu'
        ])
    },
    methods: {
        handleHeaderMenu(item, index) {
            this.$store.commit('ASIDE_MENU', this.menu[index].children);
            this.$store.commit('HEADER_MENU_ACTIVE', this.menu[index].name);
            this.$router.push({
                name: item.name
            });
        },
        handleCommand(command) {
            this.$message(`click on item ${command}`);
        },
        handleLogo() {
            this.$router.push({
                path: '/'
            });
        },
        handleHeaderNav(item, index) {
            this.$message(`click on item ${JSON.stringify(item)}`);
        }
    }
};
</script>

<style lang="scss">
    .vued-header{
        height: 100%;
        background-color: #409EFF;
    }
    .vued-logo{
        height: 100%;
        float: left;
        text-align: center;
        min-width: 200px;
        h1{
            display: inline-block;
            font-size: 20px;
            padding: 10px 16px 0 16px;
            color: #fff;
            font-weight: 700;
            cursor: pointer;
        }
    }
    .vued-header-right{
        float: right;
    }
    .vued-header-nav,
    .vued-header-left ul{
        float: left;
        line-height: 46px;
        height: 46px;
        li{
            cursor: pointer;
            float: left;
            padding: 0 10px;
            margin: 0 5px;
        }
        i,
        span{
            display: inline-block;
            vertical-align: middle;
            color: #fff;
        }
        span{
            margin-left: 3px;
        }
        li{
            &:hover{
                span{
                    font-weight: bold;
                }
            }
        }
    }
    .vued-user{
        float: left;
        margin-left: 10px;
        padding: 10px 16px;
        cursor: pointer;
        span{
            display: inline-block;
            vertical-align: middle;
        };
        .avatar{
            width: 28px;
            height: 28px;
            background-color: #ddd;
            border-radius: 50%;
            cursor: pointer;
        }
        .name{
            height: 24px;
            line-height: 24px;
            color: #fff;
            margin-left: 4px;
        }
    }
</style>
