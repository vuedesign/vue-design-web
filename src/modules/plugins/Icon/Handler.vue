<template>
    <plugin-handler name="font-awesome">
        <font-awesome name="angry" size="32px" color="#333" />
    </plugin-handler>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'plugin-icon-handler'
});
</script>

<style lang="scss">
.plugin-button--handler {
    padding: 0 10px;
    width: 100%;
    line-height: 32px;
    -webkit-user-drag: none;
}
</style>
