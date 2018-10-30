<template>
    <div class="vued-breadcrumb">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item
                v-for="(item, index) in breadcrumbs"
                :key="index"
            >{{ item.label }}</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
    computed: mapGetters('global', ['breadcrumbs'])
};
</script>

<style>
    .vued-breadcrumb{
        width: 100%;
        padding: 17px 16px;
    }
</style>
