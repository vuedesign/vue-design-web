<template>
    <a-layout-sider
        class="building-configs"
        theme="light"
        width="241px"
    >
        <config />
    </a-layout-sider>
</template>

<script>
import config from '../children/config/Index';

export default {
    name: 'building-configs',
    components: {
        config
    }
};
</script>

<style lang="scss" scoped>
.building-configs {
    background-color: #fff;
    border-left: 1px solid #d6dfe7;
}
</style>
