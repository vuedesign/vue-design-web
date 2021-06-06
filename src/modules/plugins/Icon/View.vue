<template>
    <plugin-view>
        <a-button
            type="primary"
            block
        >
            按钮
        </a-button>
    </plugin-view>
</template>

<script>
import { defineComponent, reactive } from 'vue';

export default defineComponent({
    name: 'plugin-button',
    setup() {

        const defaultStyle = reactive({
            width: 100,
            height: 32,
            left: 10,
            top: 300
        });

        return {
            defaultStyle
        };
    }
});
</script>

<style lang="scss">
.plugin-button {
    height: 100%;
    width: 100%;
    -webkit-user-drag: none;
}
</style>
