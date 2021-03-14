<template>
    <iframe id="editor-panel-iframe"></iframe>
</template>

<script>
import { defineComponent, onMounted } from 'vue';
// import { useStore } from 'vuex';

export default defineComponent({
    name: 'editor-panel-preview',
    setup() {
        // const store = useStore();
        // const currentUuid = computed(() => store.getters['workbench/currentUuid']);
        // const htmlCode = `
        //     <div id="app-iframe"></div>
        // `;

            // <script src="https://unpkg.com/vue@next"></script>
            // <script>
            //     Vue.createApp({
            //         render() {
            //             return Vue.h('div', {}, 'wujian');
            //         }
            //     }).mount('#app-iframe');
            // </script>

        // onMounted(() => {
            // const blob = new Blob([htmlCode], {
            //     'type': 'text/html'
            // });
            // const iframe = document.getElementById('editor-panel-iframe');
            // iframe.src = URL.createObjectURL(blob);
        // });
    }
});
</script>

<style lang="scss" scoped>
    #editor-panel-iframe {
        position: absolute;
        width: 100%;
        height: 100%;
        border: none;
        top: 0;
        left: 0;
        z-index: 1;
    }
</style>
