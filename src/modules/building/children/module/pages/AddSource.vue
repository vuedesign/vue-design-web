<template>
    <div class="generator-module-add-source">
        <el-tabs v-model="activeName" @tab-click="handleTabClick">
            <el-tab-pane label="Table" name="table">
                <dl class="header">
                    <dd><strong>fieldName</strong><span>字段名称</span></dd>
                    <dd><strong>fieldType</strong><span>字段类型</span></dd>
                    <dd><strong>title</strong><span>表格标题</span></dd>
                    <dd><strong>defaultValue</strong><span>默认值</span></dd>
                    <dt><strong>operate</strong><span>操作</span></dt>
                </dl>
                <table-item-edit
                    v-for="(item, index) in tableList"
                    :key="index"
                    :index="index"
                    :is-edit="item.isEdit"
                    :field-type-list="constants.fieldTypeList"
                    :table-item="item"
                    @edit="handleTableItemEdit"
                    @remove="handleTableItemRemove"
                    @update="handleTableItemUpdate"
                />
                <!--<dl v-for="(item, index) in tableList"-->
                    <!--:key="index"-->
                <!--&gt;-->
                    <!--<dd>-->
                        <!--<span>{{ item.fieldName }}</span>-->
                    <!--</dd>-->
                    <!--<dd>-->
                        <!--<span>{{ item.fieldType }}</span>-->
                    <!--</dd>-->
                    <!--<dd>-->
                        <!--<span>{{ item.title }}</span>-->
                    <!--</dd>-->
                    <!--<dd>-->
                        <!--<span>{{ item.defaultValue }}</span>-->
                    <!--</dd>-->
                    <!--<dt>-->
                        <!--<span class="btn btn-edit" @click="handleEditClick(index)">编辑</span>-->
                        <!--<span class="btn btn-delete" @click="handleDelClick(index)">删除</span>-->
                    <!--</dt>-->
                <!--</dl>-->
                <table-item-edit
                    :is-edit="true"
                    :field-type-list="constants.fieldTypeList"
                    @update="handleTableItemUpdate"
                    :table-item="resetTableItemData"
                />
            </el-tab-pane>
            <el-tab-pane label="Json" name="json">
                <editor
                    @init="editorInit"
                    lang="json"
                    theme="chrome"
                    width="100%"
                    height="480"
                    :value="JSON.stringify(tableList, null, 4)"
                    @input="handleJsonChange"
                ></editor>
            </el-tab-pane>
        </el-tabs>
        <div class="btn-group">
            <el-button type="primary" @click="handleNext('moduleForm')" size="small">下一步</el-button>
            <el-button @click="handleCancel" size="small" >返回列表</el-button>
        </div>
        <router-view />
    </div>
</template>

<script>
import * as constants from '../constants';
import { mapGetters } from 'vuex';
import TableItemEdit from '../components/TableItemEdit';

export default {
    name: 'generator-module-add-source',
    components: {
        editor: require('vue2-ace-editor'),
        TableItemEdit
    },
    data() {
        return {
            constants,
            query: this.$route.query,
            ruleForm: {},
            tableList1: [],
            activeName: 'table',
            resetTableItemData: {
                fieldName: '',
                fieldType: '',
                title: '',
                defaultValue: ''
            }
        };
    },
    computed: {
        ...mapGetters('generator/module', [
            'tableList'
        ])
    },
    watch: {
    },
    created() {
        this.$store.commit('generator/module/TABLE_LIST', this.constants.tableSourceDefaultData);
    },
    methods: {
        copy(tableList) {
            return JSON.parse(JSON.stringify(tableList));
        },
        handleTableItemEdit(index) {
            let tableList = this.copy(this.tableList);
            tableList[index].isEdit = true;
            this.$store.commit('generator/module/TABLE_LIST', tableList);
        },
        handleTableItemRemove(index) {
            let tableList = this.copy(this.tableList);
            tableList.splice(index, 1);
            this.$store.commit('generator/module/TABLE_LIST', tableList);
        },
        handleTableItemUpdate(index, tableItemData) {
            let tableList = this.copy(this.tableList);
            if (index === 'add') {
                tableList.push(Object.assign({}, tableItemData, {
                    isEdit: false
                }));
                this.resetTableItemData = {
                    fieldName: '',
                    fieldType: '',
                    title: '',
                    defaultValue: ''
                };
            } else {
                tableList[index] = Object.assign({}, tableItemData, {
                    isEdit: false
                });
            }
            this.$store.commit('generator/module/TABLE_LIST', tableList);
        },
        handleTabClick(activeName) {
            // console.log(activeName);
        },
        handleJsonChange(strData) {
            if (strData) {
                this.$store.commit('generator/module/TABLE_LIST', JSON.parse(strData));
            }
        },
        editorInit() {
            require('brace/ext/language_tools');
            require('brace/mode/json');
            require('brace/mode/javascript');
            require('brace/mode/less');
            require('brace/theme/chrome');
            require('brace/snippets/javascript');
        },
        handleEditClick() {},
        handleAddClick() {},
        handleDelClick() {},
        handleNext() {},
        handleCancel() {},
        handleEditItemClick(type, item, index, $event) {
            // let tableList = this.tableList;
            // // item.isEdit[type] = true;
            // console.log('type', type);
            // tableList.map((tableItem, tableIndex) => {
            //     tableItem.isEdit[type] = tableIndex === index;
            //     return tableItem;
            // });
            // this.$store.commit('generator/module/TABLE_LIST', JSON.parse(tableList));
        },
        handleEditItemBlur($event, item, index) {
            item.isEdit = false;
        }
    }
};
</script>

<style lang="scss" scoped>
    .generator-module-add-source{
        padding:0 16px 16px;
        dl{
            width: 100%;
            border-bottom: 1px solid #eee;
            padding: 5px 0;
            line-height: 32px;
            font-size: 14px;
            &:after{
                content: '';
                display: block;
                width: 100%;
                height: 0;
                clear: both;
            }
        }
        dt,
        dd{
            float: left;
            strong{
                display: block;
                font-weight: 700;
            }
            span{
                font-size: 12px;
                line-height: 1;
                display: inline-block;
                vertical-align: middle;
                width: 100%;
            }
            i{
                vertical-align: middle;
                cursor: pointer;
            }
        }
        dd {
            width: 22%;
        }
        dt{
            width: 12%;
            font-weight: 700;
            color: #333;
            span{
                &.btn{
                    display: block;
                    width: 50%;
                    cursor: pointer;
                    float: left;
                    text-align: center;
                    line-height: 32px;
                }
                &.btn-delete{
                    color: #fd8b87;
                    &:hover{
                        color: #f56c6c;
                    }
                }
                &.btn-edit{
                    color: #99cafd;
                    &:hover{
                        color: #409eff;
                    }
                }
            }
        }
        .header{
            dl{
                line-height: 36px;
            }
            dt,
            dd{
                span{
                    display: block;
                    color: #666;
                }
            }
        }
        .btn-group{
            padding-top: 20px;
        }
    }
</style>
