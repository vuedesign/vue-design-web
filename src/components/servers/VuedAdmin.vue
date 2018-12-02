<template>
    <div class="vued-admin">
        <vued-aside />
        <vued-right-bar />
        <router-view />
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import VuedAside from '@/components/servers/VuedAside';
import VuedRightBar from '@/components/servers/VuedRightBar';

export default {
    name: 'vued-admin',
    components: {
        VuedAside,
        VuedRightBar
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
                    const actions = this.getActions(nv, this.$route.name);
                    this.$store.commit('global/ACTIONS', actions);
                }
            },
            deep: true
        },
        '$route'() {
            const actions = this.getActions(this.asideMenu, this.$route.name);
            this.$store.commit('global/ACTIONS', actions);
        }
    },
    created() {
        this.$store.dispatch('global/findMenu');
        document.getElementsByTagName('html')[0].setAttribute('class', 'admin');
        // this.$store.dispatch('global/permission');
    },
    methods: {
        getActions(data, path) {
            let actions = [];
            setActions(data, path);
            function setActions(data, path) {
                data && data.length > 0 && data.forEach(item => {
                    if (item.name && item.name === path) {
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
    .vued-admin{
        height: 100%;
        width: 100%;
    }
</style>
