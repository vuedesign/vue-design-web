<template>
    <el-form
        class="design-module-update"
        ref="moduleUpdateForm"
        :rules="updateRules"
        :model="formData"
        label-width="80px"
        size="small">
        <el-form-item label="模块名称" prop="name">
            <el-input v-model="formData.name"></el-input>
        </el-form-item>
        <el-form-item label="模块描述" prop="description">
            <el-input v-model="formData.description"></el-input>
        </el-form-item>
        <el-form-item label="模块描述" required>
            <el-switch v-model="formData.isMenu"></el-switch>
        </el-form-item>
        <el-divider></el-divider>
        <div class="btn-group">
            <el-button type="info" @click="$emit('cancel')" plain round>取 消</el-button>
            <el-button type="success" @click="handleConfirm('moduleUpdateForm')" plain round>提 交</el-button>
        </div>
    </el-form>
</template>

<script>
import validates from '../validates';
import { formValidate } from '@vendors/utils';

export default {
    name: 'design-module-update',
    mixins: [validates],
    props: {
        pageType: {
            type: String
        }
    },
    data() {
        return {
            formData: {
                name: '',
                description: '',
                isMenu: true
            }
        };
    },
    methods: {
        handleCancel() {
            this.$emit('cancel');
        },
        async handleConfirm(formName) {
            const valid = await formValidate(this.$refs[formName]);
            if (!valid) {
                return;
            }
            this.$emit('confirm', this.formData);
        }
    }
};
</script>

<style lang="scss" scope>
    .design-module-update{
        height: 100%;
        padding: 10px 16px;

        .btn-group {
            text-align: center;
        }
    }
</style>
