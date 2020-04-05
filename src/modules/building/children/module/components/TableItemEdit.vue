<template>
    <dl class="table-item-edit">
        <template v-if="isEdit">
            <dd><el-input v-model="fromData.fieldName" size="small" /></dd>
            <dd>
                <el-select v-model="fromData.fieldType" placeholder="请选择" size="small" style="width: 100%">
                    <el-option
                        v-for="item in fieldTypeList"
                        :key="item"
                        :label="item"
                        :value="item">
                    </el-option>
                </el-select>
            </dd>
            <dd><el-input v-model="fromData.title" size="small" /></dd>
            <dd><el-input v-model="fromData.defaultValue" size="small" /></dd>
            <dt><el-button plain type="primary" @click="handleUpdateClick" size="small" style="width: 100%">提 交</el-button></dt>
        </template>
        <template v-else>
            <dd>
                <span>{{ fromData.fieldName }}</span>
            </dd>
            <dd>
                <span>{{ fromData.fieldType }}</span>
            </dd>
            <dd>
                <span>{{ fromData.title }}</span>
            </dd>
            <dd>
                <span>{{ fromData.defaultValue }}</span>
            </dd>
            <dt>
                <span class="btn btn-edit" @click="handleEditClick">编辑</span>
                <span class="btn btn-delete" @click="handleDelClick">删除</span>
            </dt>
        </template>
    </dl>
</template>

<script>

export default {
    name: 'table-item-edit',
    props: {
        isEdit: {
            type: Boolean,
            default: false
        },
        tableItem: {
            type: Object,
            default: () => {
                return {
                    fieldName: '',
                    fieldType: '',
                    title: '',
                    defaultValue: ''
                };
            }
        },
        fieldTypeList: {
            type: Array,
            default: () => []
        },
        index: {
            type: Number
        }
    },
    data() {
        return {
            fromData: {
                fieldName: '',
                fieldType: '',
                title: '',
                defaultValue: ''
            }
        };
    },
    watch: {
        tableItem: {
            handler(nv, ov) {
                Object.assign(this.fromData, nv);
            },
            deep: true,
            immediate: true
        }
    },
    methods: {
        handleUpdateClick() {
            if (typeof this.index === 'number' && this.index !== undefined) {
                this.$emit('update', this.index, this.fromData);
            } else {
                this.$emit('update', 'add', this.fromData);
            }
        },
        handleEditClick() {
            this.$emit('edit', this.index);
        },
        handleDelClick() {
            this.$emit('remove', this.index);
        }
    }
};
</script>

<style lang="scss" scoped>
    .table-item-edit{
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
            padding-right: 10px;
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
    }
</style>
