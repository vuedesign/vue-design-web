<template>
    <plugin-drop-handler class="plugin-layout-handler">
        <span>Layout</span>
        <span>布局</span>
    </plugin-drop-handler>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'plugin-layout-handler'
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
