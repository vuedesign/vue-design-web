<template>
    <a-layout class="db-container">
        <db-header />
        <router-view />
        <db-footer />
    </a-layout>
</template>

<script>
import DbHeader from './DbHeader.vue';
import DbFooter from './DbFooter.vue';

export default {
    name: 'db-container',
    components: {
        DbHeader,
        DbFooter
    }
};
</script>

<style scoped>
.db-container {
    display: flex;
    height: 100%;
    width: 100%;
    overflow: hidden;
    background-color: #f9f9f9;
}
</style>
