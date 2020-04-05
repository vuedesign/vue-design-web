<template>
    <div class="generator-folder-add">
        <el-form
            ref="folderForm"
            :model="formData"
            :rules="constants.rules"
            label-suffix=":"
            label-width="100px"
            size="medium"
        >
            <el-form-item label="模块组名称" prop="folderName">
                <el-input v-model="formData.folderName" placeholder="请输入模块组名称" :style="inputStyle"></el-input>
            </el-form-item>
            <el-form-item label="模块组描述" prop="folderLabel">
                <el-input v-model="formData.folderLabel" placeholder="请输入模块组描述" :style="inputStyle"></el-input>
            </el-form-item>
            <el-form-item label="模块组图标" prop="folderIcon">
                <el-input v-model="formData.folderIcon" placeholder="请选择图标" style="width: 194px;"></el-input>
                <span class="show-icon"><vued-iconfont :type="formData.folderIcon" /></span>
                <el-button type="primary" plain @click="handleOpenIconList">选择图标</el-button>
            </el-form-item>
            <el-form-item label="设置菜单" prop="isFolderMenu">
                <el-switch v-model="formData.isFolderMenu"></el-switch>
            </el-form-item>
        </el-form>
        <div class="btn-group">
            <el-button type="primary" @click="handleSubmit('folderForm')" size="medium">确 定</el-button>
            <el-button @click="handleCancel" size="medium" >返回列表</el-button>
        </div>
        <router-view />
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import * as constants from '../constants';

export default {
    name: 'generator-folder-add',
    data() {
        return {
            constants,
            formData: {
                folderName: '',
                folderLabel: '',
                folderIcon: '',
                isFolderMenu: true
            },
            inputStyle: {
                minWidth: '194px',
                maxWidth: '388px'
            }
        };
    },
    computed: mapGetters('generator', [
        'selectIcon'
    ]),
    watch: {
        selectIcon(val) {
            this.formData.folderIcon = val;
        }
    },
    methods: {
        handleCancel() {
            this.$router.push({ name: 'generator-folder' });
        },
        handleSubmit(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    alert('submit!');
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        handleOpenIconList() {
            this.$router.push({ name: 'generator-folder-add-icon' });
        }
    }
};
</script>

<style lang="scss" scoped>
    .generator-folder-add{
        padding: 30px;
        .btn-group{
            margin-left: 100px;
        }
        .show-icon{
            display: inline-block;
            vertical-align: top;
            width: 36px;
            height: 36px;
            line-height: 34px;
            text-align: center;
            border: 1px solid #dcdfe6;
            border-radius: 4px;
            margin: 0 5px;
            i{
                color: #409EFF;
            }
        }
    }
</style>
