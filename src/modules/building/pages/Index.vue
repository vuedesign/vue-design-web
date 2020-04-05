<template>
    <div class="project">
        <vue-design-aside />
        <vue-design-admin-body>
            <aside-menu slot="asideMenu" />
            <vue-design-breadcrumb slot="breadcrumb" />
            <router-view />
        </vue-design-admin-body>
    </div>
</template>

<script>
import AsideMenu from '../components/AsideMenu';
import VueDesignAside from '@/modules/global/components/VueDesignAside';

export default {
    name: 'project',
    components: {
        VueDesignAside,
        AsideMenu
    },
    data() {
        return {
        };
    }
};
</script>

<style lang="scss">
    .project{
        width: 100%;
        height: 100%;
        display: flex;
    }
</style>
