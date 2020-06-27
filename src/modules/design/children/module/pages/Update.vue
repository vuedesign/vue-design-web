<template>
    <el-form
        class="design-module-update"
        ref="moduleUpdateForm"
        :rules="updateRules"
        :model="formData"
        label-width="80px"
        size="small">
        <el-form-item label="父级模块" prop="parentId">
            <el-select v-model="formData.parentId" placeholder="请选择">
                <el-option
                    label="无父模块"
                    :value="PARENT_ID">
                </el-option>
                <el-option
                    v-for="item in parentList"
                    :key="item.uuid"
                    :label="item.description"
                    :value="item.id">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="模块名称" prop="name">
            <el-input v-model="formData.name"></el-input>
        </el-form-item>
        <el-form-item label="模块描述" prop="description">
            <el-input v-model="formData.description"></el-input>
        </el-form-item>
        <el-form-item label="设为菜单">
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
import { cloneDeep } from 'lodash';
import { mapGetters } from 'vuex';
import { PARENT_ID, FILE_MAP } from '../constants';

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
            PARENT_ID,
            formData: {
                name: '',
                description: '',
                isMenu: true,
                parentId: PARENT_ID,
                fileMap: cloneDeep(FILE_MAP)
            }
        };
    },
    computed: {
        ...mapGetters('design/module', [
            'list'
        ]),
        parentList() {
            return this.list.filter(item => item.parentId === PARENT_ID);
        }
    },
    methods: {
        handleCancel() {
            this.$emit('cancel');
        },
        async handleConfirm(formName) {
            const valid = await this.$refs[formName].validate().catch(() => false);
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
