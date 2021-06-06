<template>
    <plugin-handler :name="config.name">
        <span>Layout</span>
        <span>布局</span>
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
.plugin-layout-handler {
    padding: 0 10px;
    width: 100%;
    line-height: 32px;
    -webkit-user-drag: none;
    .name {
        margin-right: 5px;
    }
    &:hover {
        background-color: #eee;
        cursor: move;
    }
}
</style>
