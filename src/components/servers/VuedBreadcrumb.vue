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
    computed: mapGetters(['breadcrumbs'])
};
</script>

<style>
    .vued-breadcrumb{
        padding: 20px 16px;
    }
</style>
