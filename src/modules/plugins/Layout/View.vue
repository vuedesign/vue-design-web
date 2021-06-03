<template>
    <plugin-view>
        <a-layout>
            布局
        </a-layout>
    </plugin-view>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'plugin-layout',
    setup() {
    }
});
</script>

<style lang="scss">
.plugin-layout {
    height: 100%;
    width: 100%;
    -webkit-user-drag: none;
}
</style>
