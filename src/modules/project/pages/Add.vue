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
                    <el-tabs v-model="activeName" @tab-click="handleClick">
                        <el-tab-pane label="基本信息" name="info">
                            <div class="info-left" style="max-width: 500px;">
                                <el-form-item label="项目名称" prop="name">
                                    <el-input
                                        v-model="formData.name"
                                        placeholder="请输入项目名称"
                                        :style="constants.FROM_MAX_WIDTH"
                                    ></el-input>
                                </el-form-item>
                                <el-form-item label="项目描述" prop="description">
                                    <el-input
                                        v-model="formData.description"
                                        placeholder="请输入项目描述"
                                        :style="constants.FROM_MAX_WIDTH"
                                    ></el-input>
                                </el-form-item>
                                <el-form-item label="项目封面" prop="thumb">
                                    <el-image
                                        :src="formData.thumb"
                                        style="width: 300px; height: 200px"
                                    >
                                        <div slot="placeholder" class="image-slot">
                                            加载中<span class="dot">...</span>
                                        </div>
                                    </el-image>
                                </el-form-item>
                                
                                <el-form-item label="项目图标" prop="logo">
                                    <el-upload
                                        class="avatar-uploader"
                                        action="/api/upload/file"
                                        :headers="headers"
                                        :show-file-list="false"
                                        :on-success="handleAvatarSuccess"
                                        :before-upload="beforeAvatarUpload">
                                        <el-avatar
                                            v-if="imageUrl"
                                            shape="square"
                                            :size="50"
                                            :src="imageUrl"
                                            class="avatar"></el-avatar>
                                        <span v-else class="avatar"><i class="el-icon-plus avatar-uploader-icon"></i></span>
                                    </el-upload>
                                    <!--<el-avatar shape="square" :size="50" :src="squareUrl"></el-avatar>-->
                                </el-form-item>
                                <el-form-item label="仓库地址" prop="gitUrl">
                                    <el-input
                                        v-model="formData.gitUrl"
                                        placeholder="请输入仓库地址"
                                        :style="constants.FROM_MAX_WIDTH"
                                    ></el-input>
                                </el-form-item>
                            </div>
                        </el-tab-pane>
                        <el-tab-pane label="package" name="package">
                            <el-form-item label="package" prop="package">
                                <editor
                                    @init="editorInit"
                                    lang="json"
                                    theme="chrome"
                                    width="100%"
                                    height="480"
                                    v-model="packageData"
                                ></editor>
                            </el-form-item>
                        </el-tab-pane>
                        <el-tab-pane label="SEO" name="seo">
                            <el-form-item label="标题" prop="metaTitle">
                                <el-input
                                    v-model="formData.metaTitle"
                                    placeholder="请输入标题"
                                    :style="constants.FROM_MAX_WIDTH"
                                ></el-input>
                            </el-form-item>
                            <el-form-item label="关键词" prop="metaKeyword">
                                <el-input
                                    v-model="formData.metaKeyword"
                                    placeholder="请输入关键词"
                                    :style="constants.FROM_MAX_WIDTH"
                                ></el-input>
                            </el-form-item>
                            <el-form-item label="描述" prop="metaDescription">
                                <el-input
                                    v-model="formData.metaDescription"
                                    placeholder="请输入描述"
                                    type="textarea"
                                    :autosize="{ minRows: 4, maxRows: 8}"
                                    :style="constants.FROM_MAX_WIDTH"
                                ></el-input>
                            </el-form-item>
                        </el-tab-pane>
                    </el-tabs>
                    <el-form-item>
                        <el-button type="primary" @click="handleConfrim('projectAddForm')">提 交</el-button>
                        <el-button @click="handleCancel" >返回列表</el-button>
                    </el-form-item>
                </el-form>
                <router-view />
            </div>
        </div>
    </div>
</template>

<script>
// import ProjectAdd from '../components/ProjectAdd';
import { mapGetters } from 'vuex';
import * as constants from '../constants';
import pkg from '../../../../package.json';

export default {
    name: 'project-add',
    components: {
        editor: require('vue2-ace-editor')
    },
    data() {
        return {
            constants,
            projectList: [1, 2, 3],
            activeName: 'info',
            imageUrl: '',
            squareUrl: "https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png",
            formData: {
                name: '',
                description: '',
                logo: 'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png',
                thumb: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg1.jpeg',
                apiPrefixUrl: '',
                package: '',
                gitUrl: '',
                metaKeyword: '',
                metaDescription: '',
                metaTitle: ''
            }
        };
    },
    computed: {
        packageData: {
            set(val) {
                console.log('val', val);
                this.formData.package = val;
            },
            get() {
                return this.formData.package || JSON.stringify(pkg, null, 4);
            }
        },
        ...mapGetters('global', ['token']),
        headers() {
            return {
                authorization: `Bearer ${this.token}`
            };
        }
    },
    methods: {
        editorInit() {
            require('brace/ext/language_tools');
            require('brace/mode/json');
            require('brace/mode/javascript');
            require('brace/mode/less');
            require('brace/theme/chrome');
            require('brace/snippets/javascript');
        },
        handleCancel() {
            this.$router.push({ name: 'project' });
        },
        handleConfrim(formName) {
            this.$refs[formName].validate((valid) => {
                if (!valid) {
                     return false;
                }
            });
        },
        handleClick() {},
        handleAvatarSuccess(res, file) {
            this.imageUrl = URL.createObjectURL(file.raw);
        },
        beforeAvatarUpload(file) {
            const isImage = ['image/jpeg', 'image/png'].includes(file.type);
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isImage) {
                this.$message.error('上传头像图片只能是 JPG/PNG 格式!');
            }
            if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return isImage && isLt2M;
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
        padding: 0 20px;
    }

    .avatar {
        width: 50px;
        height: 50px;
        display: block;
        border: 1px dashed #d9d9d9;
        border-radius: 4px;
        line-height: 48px;
        text-align: center;
    }

    // .avatar-uploader .el-upload {
    //     border: 1px dashed #d9d9d9;
    //     border-radius: 6px;
    //     cursor: pointer;
    //     position: relative;
    //     overflow: hidden;
    // }
    // .avatar-uploader .el-upload:hover {
    //     border-color: #409EFF;
    // }
    // .avatar-uploader-icon {
    //     font-size: 28px;
    //     color: #8c939d;
    //     width: 178px;
    //     height: 178px;
    //     line-height: 178px;
    //     text-align: center;
    // }
    // .avatar {
    //     width: 178px;
    //     height: 178px;
    //     display: block;
    // }
</style>
