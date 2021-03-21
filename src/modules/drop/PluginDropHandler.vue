<template>
    <div class="plugin-drop-handler">
        <slot />
    </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'plugin-drop-handler',
});
</script>

<style lang="scss" scoped>
.plugin-drop-handler {
    position: relative;
    z-index: 100;
    -webkit-user-drag: none;
    box-sizing: border-box;
}
</style>
