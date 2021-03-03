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
        </a-form>
    </a-modal>
</template>

<script>
import { defineComponent, reactive, ref, toRef } from 'vue';
import { addRules } from '../rules';
import { useStore } from 'vuex';
import { message } from 'ant-design-vue';

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

        const store = useStore();
        const displayVisible = toRef(props, 'visible');
        const confirmLoading = ref(false);
        const addFormRef = ref();
        const formData = reactive({
            name: '',
            description: ''
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
