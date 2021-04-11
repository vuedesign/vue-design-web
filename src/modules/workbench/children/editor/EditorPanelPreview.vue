<template>
    <iframe id="editor-panel-preview" src="/entries/design.html"></iframe>
</template>

<script>
import { defineComponent, onMounted } from 'vue';
import { useStore } from 'vuex';

/*
const htmlCode = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width,initial-scale=1.0">
        <link rel="icon" href="/favicon.ico">
        <title>vue.design</title>
        <style>
            html,
            body,
            #appView {
                margin: 0;
                padding: 0;
                background-color: #fff;
                width: 100%;
                height: 100%;
            }
            #appView {
                position: relative;
            }
        </style>
    </head>
    <body>
        <noscript>
        <strong>We're sorry but vite doesn't work properly without JavaScript enabled. Please enable it to continue.</strong>
        </noscript>
        <div id="appView">dddddsss</div>
        <scr` + `ipt type="module" src="/src/main.view.js"></scr` + `ipt>
    </body>
    </html>
`;
*/

export default defineComponent({
    name: 'editor-panel-preview',
    setup() {
        const store = useStore();

        onMounted(() => {
            console.log('ddd', store);
            // const iframe = document.getElementById('editor-panel-preview');
            // iframe.src = '/view/index.html';
            // store.commit('workbench/SET_VIEW_IFRAME', iframe);
        });


        // function update(iframe, htmlCode) {
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
