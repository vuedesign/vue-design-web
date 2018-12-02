<template>
    <div class="vued-admin-body">
        <div class="vued-admin-left-menu" v-if="$slots.asideMenu">
            <slot name="asideMenu"></slot>
        </div>
        <div class="vued-admin-right-body">
            <slot name="breadcrumb" v-if="$slots.breadcrumb"></slot>
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: 'vued-admin-body',
    mounted() {
        console.log('$slots', this.$slots);
    }
};
</script>

<style>
    .vued-admin-body{
        height: 100%;
        position: relative;
        overflow: hidden;
    }
    .vued-admin-left-menu{
        float: left;
        height: 100%;
        overflow-x: hidden;
        overflow-y: auto;
    }
    .vued-admin-right-body{
        overflow: hidden;
        height: 100%;
        overflow-x: hidden;
        overflow-y: auto;
    }
</style>
