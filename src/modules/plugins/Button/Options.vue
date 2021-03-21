<template>
    <plugin-drop-options name="button">
        <a-input v-model="width" />
    </plugin-drop-options>
</template>

<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
    name: 'view-app',
    components: {
        PluginDropBox
    },
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
