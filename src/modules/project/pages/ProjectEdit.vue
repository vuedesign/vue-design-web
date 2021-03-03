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
        </a-form>
    </a-modal>
</template>

<script>
import { computed, defineComponent, reactive, ref, toRef, watch } from 'vue';
import { addRules } from '../rules';
import { useStore } from 'vuex';

export default defineComponent({
    name: 'project-edit',
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

        const id = toRef(props, 'id');

        store.dispatch('project/findOne', id);

        const detail = computed(() => store.getters['project/detail']);

        const displayVisible = toRef(props, 'visible');
        const confirmLoading = ref(false);
        const editFormRef = ref();
        const formData = reactive({
            name: '',
            description: ''
        });

        watch(detail, (detail) => {
            debugger;
            console.log('detail', detail);
        });

        const handleOk = () => {
            editFormRef.value
                .validate()
                .then(() => {
                    confirmLoading.value = true;
                    console.log('values', formData.value);
                    store.dispatch('project/create', formData.value)
                        .then(res => {
                            emit('update:visible', false);
                            confirmLoading.value = false;
                        });
                    // setTimeout(() => {
                    //     emit('update:visible', false);
                    //     confirmLoading.value = false;
                    // }, 1000);
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
