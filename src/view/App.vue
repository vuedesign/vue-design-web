<template>
    <div class="view-app">
        <plugin-drop-box>
            wujian
        </plugin-drop-box>
        {{ currentDropComponent }}
    </div>
</template>

<script>
import { computed, defineComponent } from 'vue';
import { useStore } from 'vuex';
import PluginDropBox from '../modules/workbench/components/PluginDropBox.vue';

export default defineComponent({
    name: 'view-app',
    components: {
        PluginDropBox
    },
    setup() {

        const store = useStore();
        const currentDropComponent = computed(() => store.getters['workbench/currentDropComponent']);

        return {
            currentDropComponent
        };
    }
});
</script>

<style lang="scss">
#appView {
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

.view-app {
    height: 100%;
    width: 100%;
}
</style>
