<template>
    <a-layout-sider
        class="workbench-configs"
        theme="light"
        width="241px"
    >
        <config />
    </a-layout-sider>
</template>

<script>
import { defineComponent } from 'vue';
import config from '../children/config/Index.vue';

export default defineComponent({
    name: 'workbench-configs',
    components: {
        config
    }
});
</script>

<style lang="scss" scoped>
.workbench-configs {
    background-color: #fff;
    border-left: 1px solid #d6dfe7;
}
</style>
