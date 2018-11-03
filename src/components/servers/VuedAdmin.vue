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
import { mapGetters } from 'vuex';
import VuedTShape from '@/components/layouts/VuedTShape';
import VuedAside from '@/components/servers/VuedAside';
import VuedHeader from '@/components/servers/VuedHeader';
import VuedBody from '@/components/servers/VuedBody';
import VuedBreadcrumb from '@/components/servers/VuedBreadcrumb';

export default {
    name: 'admin',
    components: {
        VuedTShape,
        VuedAside,
        VuedHeader,
        VuedBody,
        VuedBreadcrumb
    },
    computed: {
        ...mapGetters('global', [
            'asideMenu'
        ])
    },
    watch: {
        asideMenu: {
            handler(nv, ov) {
                if (nv && nv.length > 0) {
                    const actions = this.getActions(nv, this.$route.path);
                    this.$store.commit('global/ACTIONS', actions);
                }
            },
            deep: true
        },
        '$route'() {
            const actions = this.getActions(this.asideMenu, this.$route.path);
            this.$store.commit('global/ACTIONS', actions);
        }
    },
    created() {
        // this.$store.dispatch('global/findMenu', true);
        this.$store.dispatch('global/permission', false);
    },
    methods: {
        getActions(data, path) {
            let actions = [];
            setActions(data, path);
            function setActions(data, path) {
                data && data.length > 0 && data.forEach(item => {
                    if (item.url && item.url === path) {
                        if (item.actions && item.actions.length > 0) {
                            actions = item.actions;
                        }
                    } else {
                        setActions(item.children, path);
                    }
                });
            }
            return actions;
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
