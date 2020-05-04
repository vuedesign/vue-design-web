<template>
    <el-dialog
    title="提示"
    :visible="visible"
    width="1000px"
    :before-close="handleClose">
    <vue-cropper />
    <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="handleClose">确 定</el-button>
    </span>
    </el-dialog>
</template>

<script>
import VueCropper from 'vue-cropperjs';
import 'cropperjs/dist/cropper.css';

export default {
    name: 'project-cropper',
    components: {
        VueCropper
    },
    data() {
        return {
            visible: true
        };
    },
    methods: {
        handleClose() {}
    }
};
</script>
