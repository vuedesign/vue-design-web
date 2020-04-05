<template>
    <div class="project-add">
        <el-form
            ref="projectAddForm"
            :model="formData"
            :rules="constants.rules"
            label-suffix=":"
            label-width="90px"
            size="medium"
        >
            <el-form-item label="项目名称" prop="name">
                <el-input
                    v-model="formData.name"
                    placeholder="请输入项目名称"
                    :style="inputStyle"
                ></el-input>
            </el-form-item>
            <el-form-item label="项目描述" prop="description">
                <el-input
                    v-model="formData.description"
                    placeholder="请输入项目描述"
                    :style="inputStyle"
                ></el-input>
            </el-form-item>
        </el-form>
        <div class="btn-group">
            <el-button type="primary" @click="handleNext('projectAddForm')" size="medium">下一步</el-button>
            <el-button @click="handleCancel" size="medium" >返回列表</el-button>
        </div>
        <router-view />
    </div>
</template>

<script>
import * as constants from '../constants';
import { mapGetters } from 'vuex';

export default {
    name: 'project-add',
    data() {
        return {
            constants,
            query: this.$route.query,
            formData: {
                name: '',
                description: ''
            },
            inputStyle: {
                width: '300px'
            }
        };
    },
    computed: {
        ...mapGetters('project', [
            'list'
        ])
    },
    methods: {
        handleCancel() {
            this.$router.push({ name: 'project' });
        },
        handleNext(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.$store.commit('project/ITEM', this.formData);
                    this.$router.push({
                        name: 'project-add',
                        query: {
                            folderName: this.query.folderName
                        }
                    });
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        }
    }
};
</script>

<style lang="scss" scope>
.project-add{
    background-color: transparent;
}
</style>
