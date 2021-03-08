<template>
    <a-modal
        v-model:visible="displayVisible"
        title="创建项目"
        ok-text="确认"
        cancel-text="取消"
        :confirm-loading="confirmLoading"
        @ok="handleOk"
        @cancel="handleCancel"
    >
        <a-form
            ref="addFormRef"
            name="custom-validation"
            :label-col="labelCol"
            :wrapper-col="wrapperCol"
            :model="formData"
            :rules="addRules"
        >
            <a-form-item
                required
                has-feedback
                label="项目名称"
                name="name"
            >
                <a-input
                    v-model:value="formData.name"
                    type="text"
                    autocomplete="off"
                />
            </a-form-item>
            <a-form-item
                required
                has-feedback
                label="项目描述"
                name="description"
            >
                <a-textarea
                    v-model:value="formData.description"
                    type="text"
                    autocomplete="off"
                />
            </a-form-item>
            <a-form-item
                label="项目封面"
                name="thumb"
            >
                <a-upload
                    v-model:file-list="fileList"
                    :headers="headers"
                    name="file"
                    list-type="picture-card"
                    class="thumb-uploader"
                    :show-upload-list="false"
                    action="/api/v1/file/upload"
                    :before-upload="beforeUpload"
                    @change="handleChange"
                >
                    <img v-if="imageUrl" :src="imageUrl" alt="thumb" />
                    <div v-else>
                        <loading-outlined v-if="loading"></loading-outlined>
                        <plus-outlined v-else></plus-outlined>
                        <div class="ant-upload-text">Upload</div>
                    </div>
                </a-upload>
            </a-form-item>
        </a-form>
    </a-modal>
</template>

<script>
import { computed, defineComponent, reactive, ref, toRef } from 'vue';
import { addRules } from '../rules';
import { useStore } from 'vuex';
import { message } from 'ant-design-vue';
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons-vue';

function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}

export default defineComponent({
    name: 'project-add',
    components: {
        LoadingOutlined,
        PlusOutlined,
    },
    props: {
        visible: {
            type: Boolean,
            default: true
        }
    },
    emits: ['update:visible'],
    setup(props, { emit }) {

        const store = useStore();
        const displayVisible = toRef(props, 'visible');
        const confirmLoading = ref(false);
        const addFormRef = ref();
        const formData = reactive({
            name: '',
            description: '',
            thumb: ''
        });

        const handleOk = () => {
            addFormRef.value
                .validate()
                .then(() => {
                    confirmLoading.value = true;
                    console.log('values', formData);
                    store.dispatch('project/create', formData)
                        .then(res => {
                            emit('update:visible', false);
                            formData.name = '';
                            formData.description = '';
                            message.success('项目创建成功！');
                        })
                        .catch(() => {
                            message.error('项目创建失败！');
                        })
                        .finally(() => {
                            formRef.value.resetFields();
                            confirmLoading.value = false;
                        });
                })
                .catch((error) => {
                    console.log('error', error);
                });
        };

        const handleCancel = () => {
            emit('update:visible', false);
        };

        const fileList = ref([]);
        const loading = ref(false);
        const imageUrl = ref('');

        const handleChange = (info) => {
            if (info.file.status === 'uploading') {
                loading.value = true;
                return;
            }
            if (info.file.status === 'done') {
                // Get this url from response in real world.
                getBase64(info.file.originFileObj, (base64Url) => {
                    imageUrl.value = base64Url;
                    loading.value = false;
                });
                if (info.file.response.retcode === 0) {
                    formData.thumb = info.file.response.data.filePath;
                }
                console.log('info', info);
            }
            if (info.file.status === 'error') {
                loading.value = false;
                message.error('upload error');
            }
        };

        const beforeUpload = (file) => {
            const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
            if (!isJpgOrPng) {
                message.error('You can only upload JPG file!');
            }
            const isLt2M = file.size / 1024 / 1024 < 2;
            if (!isLt2M) {
                message.error('Image must smaller than 2MB!');
            }
            return isJpgOrPng && isLt2M;
        };

        const headers = computed(() => {
            const token = store.getters['globals/token'];
            return {
                'Authorization': `Bearer ${token}`
            };
        });

        return {
            displayVisible,
            handleOk,
            handleCancel,
            addFormRef,
            formData,
            addRules,
            confirmLoading,
            labelCol: { offset: 3, span: 4 },
            wrapperCol: { span: 14 },
            fileList,
            loading,
            imageUrl,
            handleChange,
            beforeUpload,
            headers
        };
    }
});
</script>
<style lang="scss">
.thumb-uploader > .ant-upload {
    width: 100%;
    height: 128px;
    img {
        width: 100%;
        height: auto;
    }
}
.ant-upload-select-picture-card i {
    font-size: 32px;
    color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
    margin-top: 8px;
    color: #666;
}
</style>
