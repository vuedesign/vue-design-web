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
            ref="formRef"
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
        </a-form>
    </a-modal>
</template>

<script>
import { defineComponent, reactive, ref, toRef } from 'vue';
import { addRules } from '../rules';

export default defineComponent({
    name: 'project-add',
    props: {
        visible: {
            type: Boolean,
            default: true
        }
    },
    emits: ['update:visible'],
    setup(props, { emit }) {

        const displayVisible = toRef(props, 'visible');
        const confirmLoading = ref(false);
        const formRef = ref();
        const formData = reactive({
            name: '',
            description: ''
        });

        const handleOk = () => {

            formRef.value
                .validate()
                .then(() => {
                    confirmLoading.value = true;
                    console.log('values', formData);
                    setTimeout(() => {
                        emit('update:visible', false);
                        confirmLoading.value = false;
                    }, 1000);
                })
                .catch((error) => {
                    console.log('error', error);
                });
        };

        const handleCancel = () => {

            emit('update:visible', false);
        };

        return {
            displayVisible,
            handleOk,
            handleCancel,
            formRef,
            formData,
            addRules,
            confirmLoading,
            labelCol: { offset: 3, span: 4 },
            wrapperCol: { span: 14 }
        };
    }
});
</script>
