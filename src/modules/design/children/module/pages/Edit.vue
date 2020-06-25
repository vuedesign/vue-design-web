<template>
    <div class="design-module-edit">
        <module-update
            @confirm="handleConfirm"
            @cancel="handleCancel"
        />
    </div>
</template>

<script>
import ModuleUpdate from './Update';


export default {
    name: 'design-module-edit',
    components: {
        ModuleUpdate
    },
    props: {
        visible: {
            type: Boolean
        }
    },
    data() {
        return {
            formData: {
                name: '',
                description: '',
                isMenu: true
            }
        };
    },
    methods: {
        handleCancel() {
            this.$emit('cancel');
        },
        handleConfirm(formData) {
            this.$store.dispatch('design/module/edit', formData);
            console.log('formData', formData);
        }
    }
};
</script>
