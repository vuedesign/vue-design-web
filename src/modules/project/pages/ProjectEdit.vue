<template>
    <a-modal
        v-model:visible="displayVisible"
        title="编辑项目"
        ok-text="确认"
        cancel-text="取消"
        :confirm-loading="confirmLoading"
        @ok="handleOk"
        @cancel="handleCancel"
    >
        <a-form
            ref="editFormRef"
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
                <upload-thumb v-model:value="formData.thumb" />
            </a-form-item>
        </a-form>
    </a-modal>
</template>

<script>
import { computed, defineComponent, reactive, ref, toRef, watch, watchEffect } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import { message } from 'ant-design-vue';
import { addRules } from '../rules';
import UploadThumb from '../components/UploadThumb.vue';

export default defineComponent({
    name: 'project-edit',
    components: {
        UploadThumb
    },
    props: {
        visible: {
            type: Boolean,
            default: true
        },
        id: {
            type: Number,
            required: true
        }
    },
    emits: ['update:visible'],
    setup(props, { emit }) {
        const store = useStore();
        const detail = computed(() => store.getters['project/detail']);
        const id = toRef(props, 'id');

        const displayVisible = toRef(props, 'visible');
        const confirmLoading = ref(false);
        const editFormRef = ref();
        const formData = reactive({
            id: '',
            name: '',
            description: '',
            thumb: ''
        });

        const resetFormData = () => {
            formData.id = '';
            formData.name = '';
            formData.description = '';
            formData.thumb = '';
        }

        watch([id, displayVisible], ([id, displayVisible]) => {
            if (displayVisible) {
                store.dispatch('project/findOne', id);
            }
        });

        watch(detail, detail => {
            if (!detail) {
                return;
            }
            formData.id = detail.id;
            formData.name = detail.name;
            formData.description = detail.description;
            formData.thumb = detail.thumb;
        });

        const handleOk = async () => {
            const isValidate = await editFormRef.value.validate().catch((error) => false);
            if (!isValidate) {
                return;
            }

            confirmLoading.value = true;
            store.dispatch('project/update', formData)
                .then(res => {
                    emit('update:visible', false);
                    message.success('项目编辑成功！');
                })
                .catch(() => {
                    message.error('项目编辑失败！');
                })
                .finally(() => {
                    editFormRef.value.resetFields();
                    confirmLoading.value = false;
                    resetFormData();
                });
        };

        const handleCancel = () => {
            emit('update:visible', false);
        };

        return {
            displayVisible,
            handleOk,
            handleCancel,
            editFormRef,
            formData,
            addRules,
            confirmLoading,
            labelCol: { offset: 3, span: 4 },
            wrapperCol: { span: 14 }
        };
    }
});
</script>
