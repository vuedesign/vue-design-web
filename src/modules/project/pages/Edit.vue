<template>
    <project-update page-type="edit" />
</template>

<script>
import ProjectUpdate from '../components/ProjectUpdate';

export default {
    name: 'project-edit',
    components: {
        ProjectUpdate
    },
    created() {
        this.$store.dispatch('project/findOne', this.$route.params.uuid);
    }
};
</script>
