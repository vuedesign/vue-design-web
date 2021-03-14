<template>
    <iframe id="editor-panel-preview" src="/view/index.html"></iframe>
</template>

<script>
import { defineComponent, onMounted } from 'vue';

export default defineComponent({
    name: 'editor-panel-preview',
    setup() {
        onMounted(() => {
            const iframe = document.getElementById('editor-panel-preview');
            document.getElementById('editor-panel-tools').addEventListener('mousemove', (event) => {
                console.log('ddd', event, iframe);
                // update(iframe);
            });
        });
        // function update(iframe) {
        //     const htmlCode = `<div>dddddd</div>`;
        //     const blob = new Blob([htmlCode], {
        //         'type': 'text/html'
        //     });
        //     iframe.src = URL.createObjectURL(blob);
        // }
    }
});
</script>

<style lang="scss" scoped>
#editor-panel-preview {
    background-color: transparent;
    position: absolute;
    width: 100%;
    height: 100%;
    border: none;
    top: 0;
    left: 0;
    z-index: 10;
}
</style>
