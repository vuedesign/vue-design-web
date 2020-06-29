<template>
    <div class="design-module-add">
        <module-update
            @confirm="handleConfirm"
            @cancel="handleCancel"
        />
    </div>
</template>

<script>
import ModuleUpdate from './Update';
import { cloneDeep } from 'lodash';
import { FILE_MAP } from '../constants';

export default {
    name: 'design-module-add',
    components: {
        ModuleUpdate
    },
    methods: {
        handleCancel() {
            this.$emit('cancel');
        },
        handleConfirm(formData) {
            Object.assign(formData, {
                files: this.getFileList()
            });
            this.$store.dispatch('design/module/add', formData);
            console.log('formData', formData);
        },
        getFileList() {
            const files = this.getFiles();
            return files.map(item => {
                return {
                    name: item,
                    type: item.split('.').pop(),
                    content: '',
                    path: ''
                };
            });
        },
        getFiles() {
            const files = cloneDeep(FILE_MAP);
            let fileList = [];
            files.forEach(item => {
                if (item.type === 'file') {
                    fileList.push(item.name);
                } else {
                    if (item.children && item.children) {
                        item.children.forEach(citem => {
                            if (citem.type === 'file') {
                                fileList.push(citem.name);
                            }
                        });
                    }
                }
            });
            return fileList;
        }
    }
};
</script>
