<template>
    <div class="generator-module-add">
        <el-form
            ref="moduleForm"
            :model="formData"
            :rules="constants.rules"
            label-suffix=":"
            label-width="90px"
            size="medium"
        >
            <el-form-item label="模块名称" prop="moduleName">
                <el-input
                    v-model="formData.moduleName"
                    placeholder="请输入模块名称"
                    :style="inputStyle"
                ></el-input>
            </el-form-item>
            <el-form-item label="模块描述" prop="moduleLabel">
                <el-input
                    v-model="formData.moduleLabel"
                    placeholder="请输入模块描述"
                    :style="inputStyle"
                ></el-input>
            </el-form-item>
            <el-form-item label="模块描述" prop="folderName">
                <el-select
                    v-model="formData.folderName"
                    size="medium"
                    placeholder="请选择活动区域"
                    @change="handleFolderNameChange"
                    style="min-width: 194px;"
                >
                    <el-option
                        v-for="(item, index) in folderList"
                        :label="item.label"
                        :value="item.name"
                        :key="index"
                    ></el-option>
                </el-select>
                <el-checkbox v-model="formData.isApiURL" style="margin-left: 15px;">是否自定义ApiURL</el-checkbox>
            </el-form-item>
            <el-form-item label="ApiURL" prop="moduleLabel">
                <el-input
                    :disabled="!formData.isApiURL"
                    v-model="formData.apiURL"
                    placeholder="请输入模块描述"
                    :style="inputStyle"
                ></el-input>
            </el-form-item>
            <el-form-item label="模块图标" prop="moduleIcon">
                <el-input v-model="formData.moduleIcon" placeholder="请选择图标" style="min-width: 194px; width: 194px"></el-input>
                <span class="show-icon"><vued-iconfont :type="formData.moduleIcon" /></span>
                <el-button type="primary" plain @click="handleOpenIconList">选择图标</el-button>
            </el-form-item>
            <el-form-item label="设置菜单" prop="isModuleMenu">
                <el-switch v-model="formData.isModuleMenu"></el-switch>
            </el-form-item>
            <el-form-item label="模块类型" prop="isModuleMenu">
                <el-radio-group v-model="formData.moduleType">
                    <el-radio
                        v-for="(value, key) in constants.moduleTypeMap"
                        :key="key"
                        :label="key"
                    >{{ value }}</el-radio>
                </el-radio-group>
            </el-form-item>
        </el-form>
        <div class="btn-group">
            <el-button type="primary" @click="handleSubmit('moduleForm')" size="medium">确 定</el-button>
            <el-button @click="handleCancel" size="medium" >返回列表</el-button>
        </div>
        <router-view />
    </div>
</template>

<script>
import * as constants from '../constants';
import { mapGetters } from 'vuex';

export default {
    name: 'generator-module-add',
    data() {
        return {
            constants,
            query: this.$route.query,
            formData: {
                moduleName: '',
                moduleLabel: '',
                folderName: '',
                moduleIcon: '',
                apiURL: '',
                isApiURL: false,
                isModuleMenu: true,
                moduleType: 'TABLE'
            },
            inputStyle: {
                minWidth: '194px',
                maxWidth: '388px'
            }
        };
    },
    computed: {
        apiURL() {
            if (this.formData.folderName === 'root') {
                return `/${this.formData.moduleName}`;
            }
            return `/${this.formData.folderName}-${this.formData.moduleName}`;
        },
        ...mapGetters('generator', [
            'selectIcon'
        ]),
        ...mapGetters('generator/modules', [
            'list',
            'stepActive'
        ]),
        folderList() {
            let list = [
                {
                    name: 'root',
                    label: '根模块组'
                }
            ];
            this.list.forEach(item => {
                if (item.type === 'folder') {
                    list.push({
                        name: item.name,
                        label: item.label
                    });
                }
            });
            return list;
        }
    },
    watch: {
        selectIcon(val) {
            this.formData.moduleIcon = val;
        },
        apiURL(val) {
            if (!this.formData.isApiURL) {
                this.formData.apiURL = val;
            }
        }
    },
    created() {
        if (this.query.folderName) {
            this.formData.folderName = this.query.folderName;
        }
    },
    methods: {
        handleCancel() {
            this.$router.push({ name: 'generator-module' });
        },
        handleSubmit(formName) {
            console.log(this.formData);
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    alert('submit!');
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        handleFolderNameChange(folderName) {
            console.log('folderName', folderName);
            this.$router.push({
                name: 'generator-module-add',
                query: {
                    folderName
                }
            });
        },
        handleOpenIconList() {
            this.$router.push({ name: 'generator-module-add-icon' });
        }
    }
};
</script>

<style lang="scss" scoped>
    .generator-module-add{
        padding: 30px;
        .btn-group{
            margin-left: 90px;
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
