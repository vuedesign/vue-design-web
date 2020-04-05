<template>
    <div class="vue-design-admin-body">
        <div class="vue-design-admin-left-menu" v-if="$slots.asideMenu">
            <slot name="asideMenu"></slot>
        </div>
        <div class="vue-design-admin-right-body">
            <slot name="breadcrumb" v-if="$slots.breadcrumb"></slot>
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: 'vue-design-admin-body'
};
</script>

<style>
    .vue-design-admin-body{
        height: 100%;
        flex: 1;
        overflow: hidden;
    }
    .vue-design-admin-left-menu{
        float: left;
        height: 100%;
        overflow-x: hidden;
        overflow-y: auto;
    }
    .vue-design-admin-right-body{
        overflow: hidden;
        height: 100%;
        overflow-x: hidden;
        overflow-y: auto;
    }
</style>
