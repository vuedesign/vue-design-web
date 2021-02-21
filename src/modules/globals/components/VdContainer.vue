<template>
    <a-layout class="vd-container">
        <vd-header />
        <router-view />
        <vd-footer />
    </a-layout>
</template>

<script>
import VdHeader from './VdHeader.vue';
import VdFooter from './VdFooter.vue';

export default {
    name: 'vd-container',
    components: {
        VdHeader,
        VdFooter
    }
};
</script>

<style scoped>
.vd-container {
    display: flex;
    height: 100%;
    width: 100%;
    overflow: hidden;
    background-color: #f9f9f9;
}
</style>
