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
                <el-radio-group v-model="formData.configList.find">
                    <el-radio label="none">无</el-radio>
                    <el-radio label="radio">单选</el-radio>
                    <el-radio label="checkbox">多选</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item
                v-if="formData.checkList.includes('create')"
                label="添加配置">
                <span>添加字段</span>
                <el-select
                    v-model="formData.configList.create"
                    multiple
                    collapse-tags
                    placeholder="请选择">
                    <el-option
                        v-for="item in createOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item
                v-if="formData.checkList.includes('update')"
                label="编辑配置">
                <span>编辑字段</span>
                <el-select
                    v-model="formData.configList.update"
                    multiple
                    collapse-tags
                    placeholder="请选择">
                    <el-option
                        v-for="item in updateOptions"
                        :key="item.value"
                        :label="item.label"
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
                <span>显示字段</span>
                <el-select
                    v-model="formData.configList.view"
                    multiple
                    collapse-tags
                    placeholder="请选择">
                    <el-option
                        v-for="item in viewOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item
                v-if="formData.checkList.includes('apply')"
                label="审核配置">
                <span>显示字段</span>
                <el-select
                    v-model="formData.configList.apply"
                    multiple
                    collapse-tags
                    placeholder="请选择">
                    <el-option
                        v-for="item in applyOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
                <span>编辑字段</span>
                <el-select
                    v-model="formData.configList.apply"
                    multiple
                    placeholder="请选择">
                    <el-option
                        v-for="item in applyOptions"
                        :key="item.value"
                        :label="item.label"
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
                <el-button type="primary" plain size="small" class="btn-patch">添 加</el-button>
            </el-form-item>
        </el-form>
        <div class="btn-group">
            <el-button type="primary" @click="handleNext('moduleForm')" size="medium">下一步</el-button>
            <el-button @click="handlePrevClick" size="medium" >返回上一步</el-button>
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
                checkList: ['find', 'create', 'update', 'destroy', 'view', 'apply', 'patch'],
                configList: {
                    find: 'none',
                    create: [],
                    update: [],
                    view: [],
                    destroy: {
                        batch: false
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
                    value: '审核'
                },
                {
                    key: 'patch',
                    value: '状态'
                }
            ],
            createOptions: [
                {
                    value: '选项1',
                    label: '黄金糕'
                },
                {
                    value: '选项2',
                    label: '双皮奶'
                },
                {
                    value: '选项3',
                    label: '蚵仔煎'
                },
                {
                    value: '选项4',
                    label: '龙须面'
                },
                {
                    value: '选项5',
                    label: '北京烤鸭'
                }
            ],
            updateOptions: [
                {
                    value: '选项1',
                    label: '黄金糕'
                },
                {
                    value: '选项2',
                    label: '双皮奶'
                },
                {
                    value: '选项3',
                    label: '蚵仔煎'
                },
                {
                    value: '选项4',
                    label: '龙须面'
                },
                {
                    value: '选项5',
                    label: '北京烤鸭'
                }
            ],
            viewOptions: [
                {
                    value: '选项1',
                    label: '黄金糕'
                },
                {
                    value: '选项2',
                    label: '双皮奶'
                },
                {
                    value: '选项3',
                    label: '蚵仔煎'
                },
                {
                    value: '选项4',
                    label: '龙须面'
                },
                {
                    value: '选项5',
                    label: '北京烤鸭'
                }
            ],
            applyOptions: [
                {
                    value: '选项1',
                    label: '黄金糕'
                },
                {
                    value: '选项2',
                    label: '双皮奶'
                },
                {
                    value: '选项3',
                    label: '蚵仔煎'
                },
                {
                    value: '选项4',
                    label: '龙须面'
                },
                {
                    value: '选项5',
                    label: '北京烤鸭'
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
    }
</style>
<style lang="scss" scoped>
    .generator-module-add-table{
        padding: 30px;
        .btn-group{
            margin-left: 90px;
        }
    }
</style>
