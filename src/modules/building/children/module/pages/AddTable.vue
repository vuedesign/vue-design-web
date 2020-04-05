<template>
    <div class="generator-module-add-table">
        <el-form
            ref="moduleForm"
            :model="formData"
            :rules="constants.rules"
            label-suffix=":"
            label-width="90px"
            size="medium"
        >
            <el-form-item label="表格组合" prop="table">
                <el-checkbox-group v-model="formData.checkList">
                    <el-checkbox
                        v-for="(item, index) in tableList"
                        :key="index"
                        :disabled="item.disabled"
                        :label="item.key"
                    >{{ item.value }}</el-checkbox>
                </el-checkbox-group>
            </el-form-item>
            <el-form-item
                v-if="formData.checkList.includes('find')"
                label="列表配置">
                <span class="field-text">显示字段</span>
                <el-select
                    v-model="formData.configList.find.list"
                    multiple
                    collapse-tags
                    :style="selectStyle"
                    placeholder="请选择">
                    <el-option
                        v-for="item in tableFiledOptions"
                        :key="item.value"
                        :label="item.label + ' (' + item.value + ')'"
                        :value="item.value">
                    </el-option>
                </el-select>
                <el-radio-group v-model="formData.configList.find.type" style="margin-left: 10px">
                    <el-radio label="none">无</el-radio>
                    <el-radio label="radio">单选</el-radio>
                    <el-radio label="checkbox">多选</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item
                v-if="formData.checkList.includes('create')"
                label="添加配置">
                <span class="field-text">添加字段</span>
                <el-select
                    v-model="formData.configList.create"
                    multiple
                    collapse-tags
                    :style="selectStyle"
                    placeholder="请选择">
                    <el-option
                        v-for="item in tableFiledOptions"
                        :key="item.value"
                        :label="item.label + ' (' + item.value + ')'"
                        :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item
                v-if="formData.checkList.includes('update')"
                label="编辑配置">
                <span class="field-text">编辑字段</span>
                <el-select
                    v-model="formData.configList.update"
                    multiple
                    collapse-tags
                    :style="selectStyle"
                    placeholder="请选择">
                    <el-option
                        v-for="item in tableFiledOptions"
                        :key="item.value"
                        :label="item.label + ' (' + item.value + ')'"
                        :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item
                v-if="formData.checkList.includes('destroy')"
                label="删除配置"
            >
                <el-checkbox
                    v-model="formData.configList.destroy.batch"
                >批量删除</el-checkbox>
            </el-form-item>
            <el-form-item
                v-if="formData.checkList.includes('view')"
                label="详情配置">
                <span class="field-text">显示字段</span>
                <el-select
                    v-model="formData.configList.view"
                    multiple
                    collapse-tags
                    :style="selectStyle"
                    placeholder="请选择">
                    <el-option
                        v-for="item in tableFiledOptions"
                        :key="item.value"
                        :label="item.label + ' (' + item.value + ')'"
                        :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item
                v-if="formData.checkList.includes('apply')"
                label="审核配置">
                <span class="field-text">显示字段</span>
                <el-select
                    v-model="formData.configList.apply.show"
                    multiple
                    collapse-tags
                    :style="selectStyle"
                    placeholder="请选择">
                    <el-option
                        v-for="item in tableFiledOptions"
                        :key="item.value"
                        :label="item.label + ' (' + item.value + ')'"
                        :value="item.value">
                    </el-option>
                </el-select>
                <span class="field-text" style="margin-left: 10px;">编辑字段</span>
                <el-select
                    v-model="formData.configList.apply.edit"
                    multiple
                    collapse-tags
                    :style="selectStyle"
                    placeholder="请选择">
                    <el-option
                        v-for="item in tableFiledOptions"
                        :key="item.value"
                        :label="item.label + ' (' + item.value + ')'"
                        :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item
                v-if="formData.checkList.includes('patch')"
                label="状态配置">
                <el-tag
                    :key="index"
                    v-for="(patch, index) in patchList"
                    closable
                    :disable-transitions="false"
                    @close="handlePatchClose(index)">
                    {{ patch.key }}
                </el-tag>
                <el-button
                    type="primary"
                    plain
                    size="small"
                    class="btn-patch"
                    @click="handleOpenPatchClick"
                >添 加</el-button>
            </el-form-item>
        </el-form>
        <div class="btn-group">
            <el-button type="primary" @click="handleNext('moduleForm')" size="medium">下一步</el-button>
            <el-button @click="handlePrevClick" size="medium" >返回上一步</el-button>
        </div>
        <el-dialog
            title="提示"
            :visible.sync="patchVisible"
            width="540px"
            :before-close="handleClosePatchClick">
            <el-form
                :model="patchForm"
                :rules="rules" ref="patchForm"
                label-width="100px"
                class="demo-patchForm"
                size="small"
            >
                <el-form-item label="活动名称" prop="name">
                    <el-select
                        v-model="formData.configList.patch"
                        :style="selectStyle"
                        placeholder="请选择">
                        <el-option
                            v-for="item in tableFiledOptions"
                            :key="item.value"
                            :label="item.label + ' (' + item.value + ')'"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="正文本" prop="true">
                    <el-input v-model="patchForm.true" :style="selectStyle"></el-input>
                </el-form-item>
                <el-form-item label="负文本" prop="false">
                    <el-input v-model="patchForm.false" :style="selectStyle"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="handleSubmitPatchForm('patchForm')">确 定</el-button>
                    <el-button @click="handleResetPatchForm('patchForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
import * as constants from '../constants';
import { mapGetters } from 'vuex';

export default {
    name: 'generator-module-add-base',
    data() {
        return {
            constants,
            query: this.$route.query,
            formData: {
                checkList: ['find', 'create', 'update', 'destroy', 'view', 'apply', 'patch'],
                configList: {
                    find: {
                        type: 'none',
                        list: ['id', 'name', 'type', 'thumb', 'date', 'delivery', 'resource', 'desc']
                    },
                    create: ['name', 'type', 'thumb', 'date', 'delivery', 'resource', 'desc'],
                    update: ['thumb', 'date', 'delivery', 'resource', 'desc'],
                    destroy: {
                        batch: true
                    },
                    view: ['name', 'type', 'thumb', 'date', 'delivery', 'resource', 'desc'],
                    apply: {
                        show: ['name', 'type', 'thumb', 'date', 'resource', 'desc'],
                        edit: ['delivery', 'desc']
                    },
                    patch: []
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
                    value: '审核'
                },
                {
                    key: 'patch',
                    value: '状态'
                }
            ],
            tableFiledOptions: [
                {
                    value: 'id',
                    label: 'ID'
                },
                {
                    value: 'name',
                    label: '活动名称'
                },
                {
                    value: 'type',
                    label: '活动类型'
                },
                {
                    value: 'thumb',
                    label: '活动banner'
                },
                {
                    value: 'date',
                    label: '日期'
                },
                {
                    value: 'delivery',
                    label: '即时配送'
                },
                {
                    value: 'resource',
                    label: '特殊资源'
                },
                {
                    value: 'desc',
                    label: '描述'
                }
            ],
            patchList: [
                {
                    key: 'showStatus',
                    label: '显示状态',
                    true: '显示',
                    false: '不显示'
                },
                {
                    key: 'displayType',
                    label: '显示方式',
                    true: '显示',
                    false: '不显示'
                }
            ],
            selectStyle: {
                width: '300px'
            },
            patchVisible: false,
            patchForm: {
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
        }
    },
    created() {
        Object.assign(this.formData, this.item);
        if (this.query.folderName) {
            this.formData.folderName = this.query.folderName;
        }
    },
    methods: {
        handlePrevClick() {
            this.$router.push({
                name: 'generator-module-add-base',
                query: {
                    folderName: this.query.folderName
                }
            });
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
        handlePatchClose(index) {
            this.patchList.splice(index, 1);
        },
        handleOpenPatchClick() {
            this.patchVisible = true;
        },
        handleSubmitPatchForm() {
            this.patchVisible = false;
        },
        handleResetPatchForm() {
            this.patchVisible = false;
        },
        handleClosePatchClick() {
            this.patchVisible = false;
        }
    }
};
</script>

<style lang="scss">
    .generator-module-add-table{
        .el-checkbox {
            margin-left: 0;
            margin-right: 20px;
        }
        .el-tag + .el-tag {
            margin-left: 10px;
        }
        .btn-patch{
            margin-left: 6px;
        }
        .el-radio+.el-radio {
            margin-left: 10px;
        }
    }
</style>
<style lang="scss" scoped>
    .generator-module-add-table{
        padding: 30px;
        .btn-group{
            margin-left: 90px;
        }
        .field-text{
            margin-right: 5px;
        }
    }
</style>
