<template>
    <div class="design-component-add">
        <el-form ref="form" :model="formData" label-width="70px" size="small">
            <el-form-item label="模块名称">
                <el-input v-model="formData.componentName"></el-input>
            </el-form-item>
            <el-form-item label="模块描述">
                <el-input v-model="formData.componentLabel"></el-input>
            </el-form-item>
            <div class="btn-group">
                <el-button type="info" @click="hanldeCancel" plain round>取 消</el-button>
                <el-button type="success" plain round>提 交</el-button>
            </div>
        </el-form>
    </div>
</template>

<script>

export default {
    name: 'design-component-add',
    props: {
        visible: {
            type: Boolean
        }
    },
    data() {
        return {
            formData: {
                componentName: '',
                componentLabel: ''
            }
        };
    },
    methods: {
        hanldeCancel() {
            this.$emit('cancel');
        }
    }
};
</script>

<style lang="scss" scope>
    .design-component-add{
        height: 100%;
        padding: 10px 16px;
        background-color: #f9f9f9;

        .btn-group {
            text-align: center;
        }
    }
</style>
