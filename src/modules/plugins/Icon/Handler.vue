<template>
    <plugin-handler :name="config.name">
        <font-awesome name="angry" size="32px" color="#333" />
    </plugin-handler>
</template>

<script>
import { defineComponent } from 'vue';
import config from './config.json';

export default defineComponent({
    name: `${config.tag}-handler`,
    setup() {
        return {
            config
        };
    }
});
</script>

<style lang="scss">
.plugin-button-handler {
    padding: 0 10px;
    width: 100%;
    line-height: 32px;
    -webkit-user-drag: none;
}
</style>
