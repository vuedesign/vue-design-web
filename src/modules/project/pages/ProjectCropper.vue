<template>
    <el-dialog
    :title="$route.meta.label"
    :visible="visible"
    width="800px"
    :before-close="handleClose">
    <vue-cropper
        v-loading="loading"
        :containerStyle="options.containerStyle"
        class="dialog-cropper"
        ref="cropper"
        :src="imgSrc"
        @ready="handleReady"
    />
    <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="handleCrop" :disabled="loading">裁 剪</el-button>
    </span>
    </el-dialog>
</template>

<script>
import VueCropper from 'vue-cropperjs';
import 'cropperjs/dist/cropper.css';
import { http } from 'vue-design-core';

export default {
    name: 'project-cropper',
    components: {
        VueCropper
    },
    data() {
        return {
            visible: true,
            imgSrc: '',
            options: {
                containerStyle: {
                    width: '760px',
                    height: '360px'
                }
            },
            loading: true
        };
    },
    created() {
        const { imageBlogUrl } = this.$route.query;
        this.imgSrc = imageBlogUrl;
    },
    methods: {
        loadImage(src, callback) {
            const image = new Image();
            image.crossOrigin = '';
            image.src = src;
            image.onload = () => {
                const base64 = getBase64Image(image);
                callback && callback(base64);
            };
            function getBase64Image(img, width, height) {//width、height调用时传入具体像素值，控制大小 ,不传则默认图像大小
                const canvas = document.createElement("canvas");
                canvas.width = width ? width : img.width;
                canvas.height = height ? height : img.height;
        
                const ctx = canvas.getContext("2d");
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                const dataURL = canvas.toDataURL();
                return dataURL;
            }
        },
        handleReady() {
            const { type } = this.$route.query;
            const aspectRatio = type === 'thumb' ? 3 / 2 : 1;
            this.$refs.cropper.setAspectRatio(aspectRatio);
            setTimeout(() => {
                this.loading = false;
            }, 200);
        },
        handleClose(fileName) {
            const { pageType } = this.$route.query;
            this.$router.push({
                name: `project-${pageType}`,
                query: {
                    fileName
                }
            });
        },
        async handleCrop() {
            const currentImageCanvas = this.$refs.cropper.getCroppedCanvas();
            // const base64 = currentImageCanvas.toDataURL();
            const blob = await this.toBlobPromise(currentImageCanvas);
            const res = await this.uploadFile(blob);
            console.log('res', res);
            this.handleClose(res.fileName);
        },
        toBlobPromise(currentImageCanvas) {
            return new Promise((resolve) => {
                currentImageCanvas.toBlob((blob) => {
                    resolve(blob);
                });
            });
        },
        uploadFile(blob, fileName = 'vue.design.png') {
            const formData = new FormData();
            formData.append('file', blob, fileName);
            return http.post('/api/upload/file', formData);
        }

    }
};
</script>

<style lang="scss">
    .dialog-cropper {
        text-align: center;
        img {
            max-width: 760px;
            max-height: 360px;
        }
    }
</style>
