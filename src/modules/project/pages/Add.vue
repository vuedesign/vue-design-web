<template>
    <div class="project-add">
        <div class="project-list-nav">
            <ul>
                <li v-for="(item, index) in projectList"
                    :key="index"
                >{{ item }}</li>
            </ul>
        </div>
        <div class="project-add-main">
            <vue-design-breadcrumb />
            <div class="project-add-inner">
                <el-form
                    ref="projectAddForm"
                    :model="formData"
                    :rules="constants.rules"
                    label-suffix=":"
                    label-width="90px"
                >
                    <el-form-item label="项目名称" prop="name">
                        <el-input
                            v-model="formData.name"
                            placeholder="请输入项目名称"
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
        </div>
    </div>
</template>

<script>
// import ProjectAdd from '../components/ProjectAdd';
import * as constants from '../constants';

export default {
    name: 'project-add',
    data() {
        return {
            constants,
            projectList: [1, 2, 3],
            formData: {
                name: '',
                description: ''
            }
        };
    },
    methods: {
         handleCancel() {
             this.$router.push({ name: 'project' });
         }
    },
};
</script>

<style lang="scss">
    .project-add{
        width: 100%;
        height: 100%;
        display: flex;
    }
    .project-list-nav {
        width: 280px;
        ul {
            padding: 20px;
        }
        li {
            height: 50px;
            line-height: 50px;
            margin-bottom: 10px;
            background-color: #fff;
        }
    }
    .project-add {
        flex: 1;
        display: flex;
    }
    .project-add-main {
        flex: 1;
        background-color: #fff;
    }
    .project-add-inner {
        padding: 20px;
    }
</style>
