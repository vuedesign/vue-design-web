<template>
    <el-dialog
        title="先择图标"
        :visible="true"
        width="800px"
        :close-on-click-modal="false"
        class="generator-icon-list"
        :before-close="handleCancel">
        <ul class="icon-list">
            <li v-for="(item, index) in iconList"
                :key="index"
                :class="{'select': item === selectIcon }"
                @click="handleSelectIcon(item)"
                @dblclick="handleCopyIconClassName(item)"
            >
                <span>
                    <vued-iconfont :type="item" />
                </span>
            </li>
        </ul>
        <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="handleSubmit('addForm')" size="medium">确 定</el-button>
            <el-button @click="handleCancel" size="medium" >取 消</el-button>
        </div>
    </el-dialog>
</template>

<script>
import { mapGetters } from 'vuex';
import iconList from '../iconList';

export default {
    name: 'icon-list',
    data() {
        return {
            iconList
        };
    },
    computed: {
        ...mapGetters('generator', [
            'selectIcon'
        ]),
        folderList() {
            return this.list.filter(item => item.type === 'folder');
        }
    },
    methods: {
        handleSubmit(formName) {
            if (this.selectIcon) {
                this.$router.back();
            } else {
                this.$message.warning('选择图标');
            }
        },
        handleCancel() {
            this.$store.commit('generator/SELECT_ICON', '');
            this.$router.back();
        },
        handleSelectIcon(selectIcon) {
            this.$store.commit('generator/SELECT_ICON', selectIcon);
        },
        handleCopyIconClassName(selectIcon) {
            this.$message.success(selectIcon);
        }
    }
};
</script>

<style lang="scss">
    .el-dialog__wrapper.generator-icon-list{
        left: 360px;
        right: 40px;
        top: 0;
        bottom: 0;
        overflow: hidden;
        .dialog-footer{
            text-align: left;
        }
        .el-dialog{
            margin: 0 !important;
            width: auto !important;
            height: 100%;
            border-radius: 0;
            .el-dialog__header{
                padding: 10px 20px 10px 20px;
            }
            .el-dialog__title{
                display: block;
                height: 20px;
                padding-top: 1px;
                line-height: 20px;
                font-size: 16px;
            }
            .el-dialog__footer{
                position: absolute;
                bottom: 0;
                left: 0;
                width: 100%;
            }
            .el-dialog__headerbtn{
                top: 12px;
                right: 12px;
            }
            .el-dialog__body{
                position: absolute;
                background-color: #eef5f9;
                width: 100%;
                top: 40px;
                bottom: 70px;
                overflow-x: hidden;
                overflow-y: auto;
                padding: 10px;
            }
        }
        .icon-list{
            width: 100%;
            height: auto;
            &:after{
                content: '';
                display: block;
                clear: both;
                height: 0;
                width: 100%;
            }
            li{
                width: 64px;
                height: 64px;
                line-height: 64px;
                text-align: center;
                float: left;
                &.select{
                    span{
                        border: 1px dashed #409EFF;
                        i{
                            color: #409EFF;
                        }
                    }
                }
                span{
                    display: block;
                    width: 100%;
                    height: 100%;
                    &:hover{
                        background-color: #fff;
                        cursor: pointer;
                        i{
                            color: #409EFF;
                        }
                    }
                }
                i{
                    font-size: 24px;
                }
            }
        }
    }
</style>
