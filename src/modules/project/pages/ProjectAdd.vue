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
                <upload-thumb v-model:thumb="formData.thumb" />
            </a-form-item>
        </a-form>
    </a-modal>
</template>

<script>
import { computed, defineComponent, reactive, ref, toRef } from 'vue';
import { useStore } from 'vuex';
import { message } from 'ant-design-vue';
import { addRules } from '../rules';
import UploadThumb from '../components/UploadThumb.vue';

export default defineComponent({
    name: 'project-add',
    components: {
        UploadThumb
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

        const resetFormData = () => {
            formData.name = '';
            formData.description = '';
            formData.thumb = '';
        }

        const handleOk = async () => {
            const isValidate = await addFormRef.value.validate().catch((error) => false);
            if (!isValidate) {
                return;
            }
            confirmLoading.value = true;
            store.dispatch('project/create', formData)
                .then(res => {
                    emit('update:visible', false);
                    resetFormData();
                    addFormRef.value.resetFields();
                    message.success('项目创建成功！');
                })
                .catch(() => {
                    message.error('项目创建失败！');
                })
                .finally(() => {
                    confirmLoading.value = false;
                });
        };

        const handleCancel = () => {
            emit('update:visible', false);
        };

        return {
            displayVisible,
            handleOk,
            handleCancel,
            addFormRef,
            formData,
            addRules,
            confirmLoading,
            labelCol: { offset: 3, span: 4 },
            wrapperCol: { span: 14 }
        };
    }
});
</script>
