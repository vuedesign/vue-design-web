<template>
    <div class="generator-aside-menu">
        <div class="aside-menu-header">
            <h4>模块列表</h4>
            <ul>
                <li v-for="(menu, index) in menus" :key="index">
                    <el-tooltip class="item" effect="dark" :content="menu.label" placement="bottom">
                        <span class="btn-menu" @click="handleMenuClick(menu)">
                            <vued-iconfont :type="menu.icon" />
                        </span>
                    </el-tooltip>
                </li>
            </ul>
        </div>
        <dl v-for="(one, oneIndex) in list" :key="oneIndex">
            <dt :class="one.type">
                <div class="title-icon" @click="handleFolderOpen(oneIndex)" >
                    <vued-iconfont v-if="one.type === 'module'" type="module" />
                    <vued-iconfont v-else :type="one.isOpen ? 'folder-open' : 'folder'"/>
                </div>
                <div class="operate">
                    <span class="btn-add" @click="handleModuleDel(oneIndex)">
                        <vued-iconfont type="trash" />
                    </span>
                    <span class="btn-add" @click="handleModuleAdd(oneIndex)">
                        <vued-iconfont type="add" />
                    </span>
                    <span class="btn-open" v-if="one.type === 'module'" @click="handleModuleShow(oneIndex)">
                        <vued-iconfont :type="one.isOpen ? 'up' : 'down'" />
                    </span>
                </div>
                <div class="title-text">
                    <h5>{{ one.name }}<span v-if="one.children && one.children.length > 0">({{ one.children && one.children.length }})</span></h5>
                    <p>{{ one.label }}</p>
                </div>
            </dt>
            <dd v-if="one.children && one.children.length > 0 && one.isOpen"
                v-for="(tow, towIndex) in one.children"
                :key="towIndex"
            >
                <dl>
                    <dt :class="tow.type">
                        <div class="title-icon"><vued-iconfont type="module" /></div>
                        <div class="operate">
                            <span class="btn-add" @click="handleModuleDel(oneIndex, towIndex)">
                                <vued-iconfont type="trash" />
                            </span>
                            <span class="btn-add" @click="handleModuleAdd(oneIndex, towIndex)">
                                <vued-iconfont type="add" />
                            </span>
                            <span class="btn-open" @click="handleModuleShow(oneIndex, towIndex)">
                                <vued-iconfont :type="tow.isOpen ? 'up' : 'down'" />
                            </span>
                        </div>
                        <div class="title-text">
                            <h5>{{ tow.name }}<span v-if="tow.children && tow.children.length > 0">({{ tow.children && tow.children.length }})</span></h5>
                            <p>{{ tow.label }}</p>
                        </div>
                    </dt>
                    <dd v-if="tow.children && tow.children.length > 0 && tow.isOpen"
                        v-for="(three, threeIndex) in tow.children"
                        :key="threeIndex"
                    >
                        <div class="title-icon"><vued-iconfont type="document" /></div>
                        <div class="operate"></div>
                        <div class="title-text">
                            <h6>{{ three.name }}</h6>
                            <p>{{ three.label }}</p>
                        </div>
                    </dd>
                </dl>
            </dd>
        </dl>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    name: 'generator-aside-menu',
    data() {
        return {
            menus: [
                {
                    name: 'generator-folder-add',
                    label: '创建模块组',
                    icon: 'folder-add',
                    type: 'folder'
                },
                {
                    name: 'generator-module-add',
                    label: '创建模块',
                    icon: 'file-add',
                    type: 'module'
                }
            ]
        };
    },
    computed: {
        ...mapGetters('generator/modules', [
            'list'
        ])
    },
    watch: {
        filters: {
            handler(nv, ov) {
                this.$store.dispatch('generator/modules/find');
            },
            deep: true
        }
    },
    created() {
        this.$store.dispatch('generator/modules/find');
    },
    methods: {
        handleModuleShow(oneIndex, towIndex) {
            if (towIndex !== undefined) {
                this.list[oneIndex].children[towIndex].isOpen = !this.list[oneIndex].children[towIndex].isOpen;
            } else {
                this.list[oneIndex].isOpen = !this.list[oneIndex].isOpen;
            }
        },
        handleFolderOpen(oneIndex) {
            this.list[oneIndex].isOpen = !this.list[oneIndex].isOpen;
        },
        handleModuleAdd(oneIndex) {},
        handleModuleDel(oneIndex) {},
        handleMenuClick(menu) {
            console.log(menu);
            if (menu.type === 'module') {
                this.$router.push({
                    name: menu.name,
                    query: {
                        folderName: 'root'
                    }
                });
            } else {
                this.$router.push({
                    name: menu.name
                });
            }
        }
    }
};
</script>

<style lang="scss">
    .generator-aside-menu{
        height: 100%;
        float: left;
        width: 320px;
        border-right: 1px solid #eef5f9;
        background-color: #eef5f9;
        > dl{
            border-bottom: 1px solid #dce7f3;
        }
        dl{
            &:after{
                content: '';
                display: block;
                clear: both;
                width: 100%;
                height: 0;
            }
            > dt{
                padding: 8px 10px;
                .title-icon{
                    width: 20px;
                    height: 20px;
                    line-height: 20px;
                    margin-right: 5px;
                    text-align: center;
                    cursor: pointer;
                    i{
                        font-size: 18px;
                    }
                }
                .title-text{
                    overflow: hidden;
                }
                .operate{
                    float: right;
                    span{
                        display: inline-block;
                        width: 20px;
                        height: 20px;
                        line-height: 20px;
                        text-align: center;
                        cursor: pointer;
                        color: #999;
                        &:hover{
                            color: #409EFF;
                        }
                    }
                }
                &.folder{
                    .title-icon{
                        color: #666;
                    }
                }
                &.module{
                    .title-icon{
                        color: #409EFF;
                    }
                }
            }
            > dd {
                margin-left: 24px;
                dt{
                    border-top: 1px solid #dce7f3;
                }
                dd {
                    padding: 4px;
                    .title-icon{
                        width: 20px;
                        text-align: center;
                        color: #409EFF;
                    }
                    .title-text{
                        margin-left: 10px;
                    }
                }
            }
            h5{
                font-size: 16px;
                line-height: 20px;
                color: #333;
            }
            h5,
            h6{
                span{
                    color: #999;
                    padding: 0 3px;
                    font-weight: 500;
                    font-size: 14px;
                }
            }
            h6{
                font-size: 15px;
                line-height: 20px;
                color: #333;
            }
            p{
                color: #666;
                font-size: 13px;
            }
        }
        .title-icon{
            float: left;
        }
        .title{
            overflow: hidden;
        }
        .btn-open{
            color: #666;
        }
    }
    .aside-menu-header{
        height: 40px;
        line-height: 40px;
        background-color: #fff;
        &:after{
            content: '';
            display: block;
            clear: both;
            width: 100%;
            height: 0;
        }
        h4{
            float: left;
            padding: 0 10px;
            color: #555;
        }
        ul{
            float: right;
        }
        li{
            width: 40px;
            float: left;
            text-align: center;
        }
        .btn-menu{
            cursor: pointer;
            display: inline-block;
            vertical-align: middle;
            width: 26px;
            height: 26px;
            line-height: 26px;
            border-radius: 50%;
            color: #999;
            &:hover{
                background-color: #f5f5f5;
                color: #409EFF;
            }
        }
    }
</style>
