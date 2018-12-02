<template>
    <vued-admin-body>
        <aside-menu slot="asideMenu" />
        <vued-breadcrumb slot="breadcrumb" />
        dashboard content
    </vued-admin-body>
</template>

<script>
import AsideMenu from './components/AsideMenu';

export default {
    components: { AsideMenu },
    data() {
        return {};
    }
};
</script>

<style lang="scss">
</style>
