<template>
    <div class="generator-module-add-base">
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
            <template v-if="formData.moduleType === 'TABLE'">
                <el-form-item label="表格组合" prop="table">
                    <el-checkbox-group v-model="formData.table.checkList">
                        <el-checkbox
                            v-for="(item, index) in tableList"
                            :key="index"
                            :disabled="item.disabled"
                            :label="item.key"
                        >{{ item.value }}</el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item
                    v-if="formData.table.checkList.includes('find')"
                    label="列表">
                    <el-checkbox
                        v-model="formData.table.checkList.find.checkbox"
                    >多选</el-checkbox>
                </el-form-item>
                <el-form-item
                    v-if="formData.table.checkList.includes('destroy')"
                    label="删除"
                >
                    <el-checkbox
                        v-model="formData.table.checkList.find.batch"
                    >批量删除</el-checkbox>
                </el-form-item>
            </template>
        </el-form>
        <div class="btn-group">
            <el-button type="primary" @click="handleNext('moduleForm')" size="medium">下一步</el-button>
            <el-button @click="handleCancel" size="medium" >返回列表</el-button>
        </div>
        <router-view />
    </div>
</template>

<script>
import * as constants from './constants';
import { mapGetters } from 'vuex';

export default {
    name: 'generator-module-add-base',
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
                moduleType: 'TABLE',
                table: {
                    checkList: ['find', 'create', 'update'],
                    configList: {
                        find: {
                            checkbox: false
                        },
                        destroy: {
                            batch: false
                        }
                    }
                }
            },
            tableList: [
                {
                    key: 'find',
                    value: '列表',
                    disabled: true
                },
                {
                    key: 'create',
                    value: '添加'
                },
                {
                    key: 'update',
                    value: '编辑'
                },
                {
                    key: 'destroy',
                    value: '删除'
                },
                {
                    key: 'view',
                    value: '详情'
                },
                {
                    key: 'apply',
                    value: '申请'
                },
                {
                    key: 'patch',
                    value: '状态'
                }
            ],
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
        ...mapGetters('generator/module', [
            'list',
            'item'
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
        '$route'(to) {
            if (to.query.folderName) {
                this.formData.folderName = to.query.folderName;
            }
        },
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
        Object.assign(this.formData, this.item);
        if (this.query.folderName) {
            this.formData.folderName = this.query.folderName;
        }
    },
    methods: {
        handleCancel() {
            this.$router.push({ name: 'generator-module' });
        },
        handleNext(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.$store.commit('generator/module/ITEM', this.formData);
                    this.$router.push({
                        name: 'generator-module-add-data',
                        query: {
                            folderName: this.query.folderName
                        }
                    });
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        handleFolderNameChange(folderName) {
            this.$router.push({
                name: 'generator-module-add-base',
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

<style lang="scss">
    .generator-module-add-base{
        .el-checkbox {
            margin-left: 0;
            margin-right: 20px;
        }
    }
</style>
<style lang="scss" scoped>
    .generator-module-add-base{
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
