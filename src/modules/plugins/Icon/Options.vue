<template>
    <plugin-options name="button">
        <a-input v-model="width" />
    </plugin-options>
</template>

<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
    name: 'plugin-button-options',
    setup() {

        const width = ref(100);

        return {
            width
        };
    }
});
</script>

<style lang="scss">
</style>
