<template>
    <el-dialog
        title="提示"
        :visible="true"
        width="700px"
        class="operate-activity-add"
        :before-close="handleClose">
        <el-form
            ref="addForm"
            :model="formData"
            label-width="80px"
            size="small"
        >
            <el-form-item label="key">
                <el-input v-model="formData.key" :style="inputStyle"></el-input>
            </el-form-item>
            <el-form-item label="title">
                <el-input v-model="formData.title" :style="inputStyle"></el-input>
            </el-form-item>
            <el-form-item label="value">
                <el-input v-model="formData.value" :style="inputStyle"></el-input>
            </el-form-item>
            <el-form-item label="default">
                <el-input v-model="formData.default" :style="inputStyle"></el-input>
            </el-form-item>
            <el-form-item label="options">
                <el-input
                    type="textarea"
                    :autosize="{ minRows: 1, maxRows: 10}"
                    placeholder="请输入内容"
                    :value="JSON.stringify(formData.options, null, 4)"
                    :style="inputStyle"
                ></el-input>
            </el-form-item>
            <el-form-item label="filter">
                <el-radio-group v-model="formData.filter">
                    <el-radio
                        v-for="(value, key) in constants.booleanMap"
                        :label="key"
                        :key="key"
                    >{{ value }}</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="validate">
                <el-radio-group v-model="formData.validate">
                    <el-radio
                        v-for="(value, key) in constants.booleanMap"
                        :label="key"
                        :key="key"
                    >{{ value }}</el-radio>
                </el-radio-group>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="handleCancel" size="small">取 消</el-button>
            <el-button type="primary" @click="handleSubmit('addForm')" size="small" >确 定</el-button>
          </span>
    </el-dialog>
</template>

<script>
import { mapGetters } from 'vuex';
import * as constants from './constants';

export default {
    name: 'operate-activity-add',
    data() {
        return {
            constants,
            formData: {
                key: '',
                title: '',
                value: '',
                default: '',
                options: '',
                filter: '',
                validate: ''
            },
            inputStyle: {
                minWidth: '194px',
                maxWidth: '388px'
            },
            type: null,
            id: this.$route.params.id
        };
    },
    computed: {
        ...mapGetters('generator/module', [
            'tableList',
            'tableItem'
        ])
    },
    watch: {
        tableItem: {
            handler(nv, ov) {
                console.log('tableItem:', nv);
                this.formData = Object.assign({}, nv);
            },
            deep: true
        }
    },
    created() {
        if (this.id !== undefined) {
            this.type = 'EDIT';
            const tableItem = this.tableList[this.id];
            this.$store.commit('generator/module/TABLE_ITEM', tableItem);
        } else {
            this.type = 'ADD';
            this.$store.commit('generator/module/TABLE_ITEM', {
                key: '',
                title: '',
                value: '',
                default: '',
                options: '',
                filter: 'false',
                validate: 'true'
            });
        }
    },
    methods: {
        handleClose(done) {
            this.$router.push({ name: 'generator-module-add-data' });
        },
        handleCancel() {
            this.$router.push({ name: 'generator-module-add-data' });
        },
        handleSubmit(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    let formListData = this.tableList;
                    if (this.type === 'ADD') {
                        formListData.push(this.formData);
                    } else {
                        formListData[this.id] = this.formData;
                    }
                    console.log(formListData);
                    this.$store.commit('generator/module/TABLE_LIST', formListData);
                    this.$router.push({ name: 'generator-module-add-data' });
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        }
    }
};
</script>

<style lang="scss" scoped>
    .line{
        display: inline-block;
        text-align: center;
        height: 1px;
    }
</style>
