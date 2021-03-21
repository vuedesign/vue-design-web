<template>
    <plugin-drop-box
        :default-style="defaultStyle"
    >
        <a-button
            type="primary"
            block
        >
            按钮
        </a-button>
    </plugin-drop-box>
</template>

<script>
import { defineComponent, reactive } from 'vue';
import PluginDropBox from '../modules/workbench/components/PluginDropBox.vue';

export default defineComponent({
    name: 'view-app',
    components: {
        PluginDropBox
    },
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
    -webkit-user-drag: none;
}
</style>
