<template>
    <plugin-options :name="config.name">
        <!-- <a-input v-model="width" /> -->
    </plugin-options>
</template>

<script>
import { defineComponent } from 'vue';
import config from './config.json';

export default defineComponent({
    name: `${config.tag}-options`,
    setup() {
        return {
            config
        };
    }
});
</script>

<style lang="scss">
</style>
