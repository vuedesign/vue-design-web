<template>
    <vued-t-shape>
        <vued-header slot="header"></vued-header>
        <vued-aside slot="aside" v-if="$store.state.global.asideMenu"></vued-aside>
        <vued-breadcrumb slot="breadcrumb"></vued-breadcrumb>
        <vued-body slot="body">
            <router-view/>
        </vued-body>
    </vued-t-shape>
</template>

<script>
import VuedTShape from '@/components/layouts/VuedTShape';
import VuedAside from '@/components/servers/VuedAside';
import VuedHeader from '@/components/servers/VuedHeader';
import VuedBody from '@/components/servers/VuedBody';
import VuedBreadcrumb from '@/components/servers/VuedBreadcrumb';

export default {
    name: 'admin',
    data() {
        return {
            isThree: false
        };
    },
    components: {
        VuedTShape,
        VuedAside,
        VuedHeader,
        VuedBody,
        VuedBreadcrumb
    },
    created() {
        this.$store.dispatch('global/findMenu', this.isThree);
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
