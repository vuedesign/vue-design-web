<template>
    <vued-admin-body>
        <aside-menu slot="asideMenu" />
        <vued-breadcrumb slot="breadcrumb" />
        <router-view />
    </vued-admin-body>
</template>

<script>
import AsideMenu from './components/AsideMenu';

export default {
    name: 'generator',
    components: { AsideMenu },
    data() {
        return {
        };
    }
};
</script>

<style lang="scss">
    .generator{
        width: 100%;
        height: 100%;
    }
    .generator-body{
        overflow: hidden;
        overflow-y: auto;
        height: 100%;
    }
</style>
