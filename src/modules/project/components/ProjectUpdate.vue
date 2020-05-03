<template>
    <div class="project-update">
        <vue-design-breadcrumb />
        <div class="project-update-main">
            <el-form
                ref="projectUpdateForm"
                :model="formData"
                :rules="updateRules"
                label-suffix=":"
                label-width="90px"
                class="project-update-form"
            >
                <el-tabs v-model="activeName"
                    tab-position="left"
                    @tab-click="handleClick">
                    <el-tab-pane label="基本信息" name="info">
                        <div class="info-left" style="max-width: 500px;">
                            <el-form-item label="项目名称" prop="name">
                                <el-input
                                    v-model="formData.name"
                                    placeholder="请输入项目名称"
                                    :style="FROM_MAX_WIDTH"
                                ></el-input>
                            </el-form-item>
                            <el-form-item label="项目描述" prop="description">
                                <el-input
                                    v-model="formData.description"
                                    placeholder="请输入项目描述"
                                    :style="FROM_MAX_WIDTH"
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
                                    :headers="globalHeaders"
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
                            </el-form-item>
                            <el-form-item label="仓库地址" prop="gitUrl">
                                <el-input
                                    v-model="formData.gitUrl"
                                    placeholder="请输入仓库地址"
                                    :style="FROM_MAX_WIDTH"
                                ></el-input>
                            </el-form-item>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="package" name="package">
                        <el-form-item label="package" prop="package">
                            <ace-editor
                                @init="editorInit"
                                lang="json"
                                theme="chrome"
                                width="100%"
                                height="480"
                                v-model="packageData"
                            ></ace-editor>
                        </el-form-item>
                    </el-tab-pane>
                    <el-tab-pane label="SEO" name="seo">
                        <el-form-item label="标题" prop="metaTitle">
                            <el-input
                                v-model="formData.metaTitle"
                                placeholder="请输入标题"
                                :style="FROM_MAX_WIDTH"
                            ></el-input>
                        </el-form-item>
                        <el-form-item label="关键词" prop="metaKeyword">
                            <el-input
                                v-model="formData.metaKeyword"
                                placeholder="请输入关键词"
                                :style="FROM_MAX_WIDTH"
                            ></el-input>
                        </el-form-item>
                        <el-form-item label="描述" prop="metaDescription">
                            <el-input
                                v-model="formData.metaDescription"
                                placeholder="请输入描述"
                                type="textarea"
                                :autosize="{ minRows: 4, maxRows: 8}"
                                :style="FROM_MAX_WIDTH"
                            ></el-input>
                        </el-form-item>
                    </el-tab-pane>
                    <el-form-item>
                        <el-button type="primary" @click="handleConfrim('projectUpdateForm')">提 交</el-button>
                        <el-button type="success" @click="handlePrev" :disabled="activeName === 'info'">上一项</el-button>
                        <el-button type="success" @click="handleNext" :disabled="activeName === 'seo'">下一项</el-button>
                        <el-button @click="handleCancel" >返回列表</el-button>
                    </el-form-item>
                </el-tabs>
            </el-form>
            <router-view />
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { FROM_MAX_WIDTH, tabNameMap } from '../constants';
import pkg from '../../../../package.json';
import updateRules from '../validates/updateRules';

export default {
    name: 'project-update',
    mixins: [updateRules],
    props: {
        pageType: String
    },
    components: {
        AceEditor: require('vue2-ace-editor')
    },
    data() {
        return {
            FROM_MAX_WIDTH,
            activeName: 'info',
            activeStep: 1,
            imageUrl: '',
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
        ...mapGetters('project', ['detail']),
        packageData: {
            set(val) {
                console.log('val', val);
                this.formData.package = val;
            },
            get() {
                return this.formData.package || JSON.stringify(pkg, null, 4);
            }
        }
    },
    watch: {
        detail: {
            handler(nv) {
                Object.assign(this.formData, nv);
            },
            deep: true
        }
    },
    methods: {
        editorInit() {
            require('brace/ext/language_tools');
            require('brace/mode/json');
            // require('brace/mode/javascript');
            // require('brace/mode/less');
            require('brace/theme/chrome');
            require('brace/snippets/javascript');
        },
        handlePrev() {
            this.activeStep --;
            this.activeName = tabNameMap[this.activeStep];
        },
        handleNext() {
            this.activeStep ++;
            this.activeName = tabNameMap[this.activeStep];
        },
        handleCancel() {
            this.$router.push({ name: 'project' });
        },
        handleConfrim(formName) {
            this.$refs[formName].validate((valid) => {
                if (!valid) {
                     return false;
                }
                this.$store.dispatch(`project/${this.pageType}`, this.formData);
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

<style lang="scss" scope>
    .project-update{
        width: 100%;
        height: 100%;
        display: flex;
        flex: 1;
        overflow: hidden;
        flex-direction: column;
    }
    .project-update-main {
        height: 100%;
        flex: 1;
    }
    .project-update-form {
        height: 100%;
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
</style>
<style lang="scss">
    .project-update{
        .el-tabs__content {
            background-color: #fff;
            padding: 30px 20px;
            height: 100%;
        }
        .el-tabs {
            height: 100%;
        }
        .el-tabs__header.is-left {
            margin-right: 0;
        }
    }
</style>
