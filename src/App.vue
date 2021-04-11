<template>
    <router-view />
</template>

<script>
import { defineComponent, computed } from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
    name: 'app',
    setup() {
        const store = useStore();
        const currentDropComponent = computed(() => store.getters['workbench/currentDropComponent']);
        console.log('app currentDropComponent----', currentDropComponent.value);
    }
});
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;
  display: flex;
}
* {
    margin: 0;
    padding: 0;
    box-sizing: content-box;
}
ul, ol, li {
    list-style: none;
    margin: 0;
    padding: 0;
}
</style>
