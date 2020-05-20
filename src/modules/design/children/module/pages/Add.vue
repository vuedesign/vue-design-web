<template>
    <div class="design-module-add">
        <module-update @confirm="handleConfirm" />
    </div>
</template>

<script>
import ModuleUpdate from './Update';

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
            this.$store.dispatch('design/module/add', formData);
            console.log('formData', formData);
        }
    }
};
</script>
