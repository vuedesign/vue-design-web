<template>
    <plugin-drop-handler class="plugin-button-handler">
        <span class="name">button</span>
        <span class="label">按钮</span>
    </plugin-drop-handler>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'plugin-button-handler'
});
</script>

<style lang="scss">
.plugin-button-handler {
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
