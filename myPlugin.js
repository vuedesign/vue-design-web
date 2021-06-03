const fileRegex = /\DesignFrame.vue$/;
import { compileFileToJS } from 'vue';

export default function myPlugin() {
    return {
        name: 'transform-file',
        transform(src, id) {
            if (fileRegex.test(id)) {
                const aaa = src.match(/<style lang="scss">(([\s\S])*?)<\/style>\n/);
                console.log('src', aaa[1]);
                return {
                    code: compileFileToJS(src),
                    map: null // provide source map if available
                }
            }
        }
    }
}
