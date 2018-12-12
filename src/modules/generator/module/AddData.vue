<template>
    <div class="generator-module-add-data">
        <vued-filter>
            <ul class="left">
                <li><el-button type="primary" size="small" @click="handleAddClick">新 增</el-button></li>
            </ul>
        </vued-filter>
        <el-tabs v-model="activeName" @tab-click="handleTabClick">
            <el-tab-pane label="Table" name="table">
                <dl class="header">
                    <dt><strong>key</strong><span>表格键</span></dt>
                    <dd><strong>title</strong><span>表格标题</span></dd>
                    <dd><strong>value</strong><span>表格值</span></dd>
                    <dd><strong>default</strong><span>默认值</span></dd>
                    <dd><strong>options</strong><span>配置</span></dd>
                    <dd><strong>filter</strong><span>是否开启筛选</span></dd>
                    <dd><strong>validate</strong><span>是否表单校验</span></dd>
                    <dd><strong>operate</strong><span>操作</span></dd>
                </dl>
                <dl v-for="(item, index) in tableList"
                    :key="index"
                >
                    <dt>{{ item.key }}</dt>
                    <dd>{{ item.title }}</dd>
                    <dd>{{ item.value }}</dd>
                    <dd>{{ item.default ? item.default : '-' }}</dd>
                    <dd>{{ item.options ? '{}' : '-' }}</dd>
                    <dd>{{ constants.booleanMap[item.filter] }}</dd>
                    <dd>{{ constants.booleanMap[item.validate] }}</dd>
                    <dd>
                        <el-button type="text" size="medium" @click="handleEditClick(index)">编辑</el-button>
                        <el-button type="text" size="medium" @click="handleDelClick(index)">删除</el-button>
                    </dd>
                </dl>
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
            <el-button type="primary" @click="handleSubmitClick" size="medium">保 存</el-button>
            <el-button @click="handlePrevClick" size="medium" >返回上一步</el-button>
        </div>
        <router-view />
    </div>
</template>

<script>
import * as constants from './constants';
import { mapGetters } from 'vuex';

export default {
    name: 'generator-module-add-data',
    components: {
        editor: require('vue2-ace-editor')
    },
    data() {
        return {
            constants,
            query: this.$route.query,
            inputStyle: {
                minWidth: '194px',
                maxWidth: '388px'
            },
            activeName: 'table'
        };
    },
    computed: {
        ...mapGetters('generator/module', [
            'tableList'
        ])
    },
    created() {
        this.$store.commit('generator/module/TABLE_LIST', this.constants.tableDefaultData);
    },
    methods: {
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
        handleAddClick() {
            this.$router.push({ name: 'generator-module-add-data-add' });
        },
        handleEditClick(index) {
            this.$router.push({
                name: 'generator-module-add-data-edit',
                params: {
                    id: index
                }
            });
        },
        handleDelClick(index) {
            const tableList = [...this.tableList];
            tableList.splice(index, 1);
            this.$store.commit('generator/module/TABLE_LIST', tableList);
        },
        handleTabClick(activeName) {
            // console.log(activeName);
        },
        handleSubmitClick() {
            alert('Submit');
        },
        handlePrevClick() {
            this.$router.push({
                name: 'generator-module-add-base',
                query: {
                    folderName: this.query.folderName
                }
            });
        }
    }
};
</script>

<style lang="scss">
    .generator-module-add-data{
        .el-tabs__header{
            margin: 0;
        }
    }
</style>
<style lang="scss" scoped>
    .generator-module-add-data{
        padding:0 16px 16px;
        dl{
            width: 100%;
            border-bottom: 1px solid #eee;
            padding: 5px 0;
            line-height: 36px;
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
            width: 12.5%;
            float: left;
            strong{
                display: block;
                font-weight: 700;
            }
            span{
                display: block;
                font-size: 12px;
                line-height: 1;
                color: #999;
            }
        }
        dt{
            font-weight: 700;
            color: #333;
        }
        .header{
        }
    }
    .btn-group{
        margin-top: 20px;
    }
</style>
