<template>
    <a-upload
        v-model:file-list="fileList"
        class="thumb-uploader"
        :headers="headers"
        name="file"
        list-type="picture-card"
        :show-upload-list="false"
        action="/api/v1/file/upload"
        :before-upload="beforeUpload"
        @change="handleChange"
    >
        <div v-if="imageUrl" class="img-inner" :style="{ backgroundImage: `url(${imageUrl})`}" />
        <div v-else class="img-inner">
            <div class="img-box">
                <loading-outlined v-if="loading" />
                <plus-outlined v-else :style="{fontSize: '24px', color: '#999'}" />
                <div class="ant-upload-text">
                    上传
                </div>
            </div>
        </div>
    </a-upload>
</template>

<script>
import { defineComponent, toRef, ref, computed } from 'vue';
import { useStore } from 'vuex';
import { message } from 'ant-design-vue';
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons-vue';

function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}

export default defineComponent({
    name: 'project-more',
    components: {
        PlusOutlined,
        LoadingOutlined
    },
    props: {
        value: {
            type: String,
            default: ''
        }
    },
    emits: ['update:value'],
    setup(props, { emit }) {
        const store = useStore();

        const fileList = ref([]);
        const loading = ref(false);
        const imageUrl = toRef(props, 'value');

        console.log('imageUrl==========', imageUrl);

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
                    emit('update:value', info.file.response.data.filePath);
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
    height: auto;
    .img-inner {
        width: 100%;
        height: 0;
        padding-top: 59%;
        background-position: center center;
        background-repeat: no-repeat;
        background-size: cover;
        position: relative;
    }

    .img-box {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
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
