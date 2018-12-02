<template>
    <div class="vued-right-bar">
        <div class="vued-user">
            <el-popover
                placement="left"
                width="240"
                trigger="click"
            >
                <span class="avatar" slot="reference"></span>
                <div class="vued-user-popover">
                    <dl>
                        <dt><span class="avatar-big"></span></dt>
                        <dd>
                            <h4>wujian</h4>
                            <p>wujian@aaa.cn</p>
                        </dd>
                    </dl>
                    <ul>
                        <li class="setting" @click="handleSetting">
                            <vued-iconfont type="setting" />
                            <span>设置</span>
                        </li>
                        <li class="exit" @click="handleExit">
                            <vued-iconfont type="exit" />
                            <span>退出</span>
                        </li>
                    </ul>
                </div>
            </el-popover>
        </div>
        <ul>
            <li>
                <el-popover
                    placement="left"
                    title="消息"
                    width="200"
                    trigger="click"
                    content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。">
                    <span class="menu-btn" slot="reference"><vued-iconfont type="message"></vued-iconfont></span>
                </el-popover>
            </li>
            <li
                v-for="(item, index) in rightBarMenu"
                v-if="item.type !== 'MORE'"
                :index="item.name"
                :key="index"
                @click="handleHeaderNav(item, index)"
            >
                <el-tooltip class="item" effect="dark" :content="item.label" placement="left">
                    <span class="menu-btn"><vued-iconfont :type="item.icon"></vued-iconfont></span>
                </el-tooltip>
            </li>
            <li>
                <el-popover
                    placement="left"
                    width="200"
                    trigger="click">
                    <div class="vued-right-bar-more">
                        <dl v-for="(item, index) in rightBarMenu"
                            v-if="item.type === 'MORE'"
                            :key="index"
                        >
                            <dt><vued-iconfont :type="item.icon" /></dt>
                            <dd>{{ item.label }}</dd>
                        </dl>
                    </div>
                    <span class="menu-btn" slot="reference"><vued-iconfont type="menu-more"></vued-iconfont></span>
                </el-popover>
            </li>
        </ul>
    </div>
</template>

<script>
import rightBarMenu from '@/configs/rightBarMenu';

export default {
    name: 'vued-right-bar',
    data() {
        return {
            rightBarMenu
        };
    },
    methods: {
        handleExit() {
            this.$message(`click exit`);
        },
        handleSetting() {
            this.$message(`click setting`);
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
    .vued-right-bar{
        height: 100%;
        background-color: #eef5f9;
        width: 40px;
        float: right;
        ul{
            line-height: 40px;
            width: 40px;
            height: auto;
        }
        li{
            cursor: pointer;
            width: 40px;
            height: 40px;
            line-height: 40px;
            text-align: center;
            span.menu-btn{
                cursor: pointer;
                display: inline-block;
                vertical-align: middle;
                width: 26px;
                height: 26px;
                line-height: 26px;
                border-radius: 50%;
                text-align: center;
                margin-left: 0;
                & > i{
                    display: block;
                    vertical-align: middle;
                    color: #999;
                }
                &:hover{
                    background-color: #fff;
                    i{
                        color: #2c8eff;
                    }
                }
            }
        }
    }
    .vued-user{
        padding: 6px;
        cursor: pointer;
        > span{
            display: block;
            height: 28px;
            line-height: 28px;
        };
        .avatar{
            display: block;
            vertical-align: middle;
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
    .vued-user-popover{
        dl,
        ul{
            &:after{
                content: '';
                display: block;
                clear: both;
                width: 100%;
                height: 0;
            }
        }
        dt{
            float: left;
            margin-right: 10px;
            .avatar-big{
                display: block;
                width: 40px;
                height: 40px;
                border-radius: 50%;
                background-color: #eee;
            }
        }
        dd{
            h4{
                font-size: 18px;
            }
            p{
                color: #999;
            }
        }
        ul{
            padding-top: 10px;
            border-top: 1px solid #f9f9f9;
            margin-top: 10px;
        }
        li{
            float: left;
            cursor: pointer;
            i,
            span{
                display: inline-block;
                vertical-align: middle;
                color: #999;
            }
            &:hover{
                i,
                span{
                    color: #409EFF;
                }
            }
            &.exit{
                float: right;
            }
            &.setting{
                float: left;
            }
        }
    }
    .vued-right-bar-more{
        &:after{
            content: '';
            display: block;
            width: 100%;
            height: 0;
            clear: both;
        }
        dl{
            width: 50%;
            float: left;
            cursor: pointer;
            text-align: center;
            border: 1px solid transparent;
            padding: 10px 0;
            border-radius: 3px;
            &:hover{
                border: 1px solid #eee;
            }
        }
        dt{
            i.iconfont{
                font-size: 32px;
            }
        }
    }
</style>
