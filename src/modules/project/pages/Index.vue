<template>
    <div class="project">
        <vue-design-aside />
        <router-view />
        <vue-design-right-bar />
    </div>
</template>

<script>
import VueDesignAside from '@/modules/global/components/VueDesignAside';
import VueDesignRightBar from '@/modules/global/components/VueDesignRightBar';

export default {
    name: 'project',
    components: {
        VueDesignAside,
        VueDesignRightBar
    }
};
</script>

<style lang="scss">
    .project{
        width: 100%;
        height: 100%;
        display: flex;
        background-color: #eef5f9;
    }
</style>
