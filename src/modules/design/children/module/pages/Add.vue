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
            const files = cloneDeep(FILE_MAP);
            Object.assign(formData, {
                files: this.getFiles(files),
                components: this.getComponents(files)
            });
            this.$store.dispatch('design/module/add', formData);
            console.log('formData', formData);
        },
        getComponents(files) {
            let componentList = [];
            files.forEach(item => {
                if (item.type === 'dir' && item.children) {
                    item.children.forEach(cItem => {
                        if (cItem.type === 'component') {
                            componentList.push({
                                name: cItem.name,
                                type: item.name,
                                html_tag: '',
                                tag_id: '',
                                options: '',
                                content: ''
                            });
                        }
                    });
                }
            });
            return componentList;
        },
        getFiles(files) {
            let fileList = [];
            files.forEach(item => {
                if (item.type === 'file') {
                    fileList.push({
                        name: item.name,
                        type: item.name.split('.').pop(),
                        path: '',
                        content: ''
                    });
                }
            });
            return fileList;
        }
    }
};
</script>
