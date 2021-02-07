<template>
    <a-layout-content style="padding: 0 50px">
        <a-input id="file" type="file" />
        <div class="box" style="display: flex; flex-direction: column;background-color: #333;width: 100%; height: 200px;">
            <div class="box-item" style="background-color: red;">1</div>
            <div class="box-item" style="background-color: blue; flex: 1 0 0;">
                <div style="height: 300px; background-color: #999;">1</div>
            </div>
        </div>
    </a-layout-content>
</template>
<script>

import { defineComponent, onMounted } from 'vue';
// const JSZip = require('jszip');

export default defineComponent({
    name: 'db-demo',
    setup() {
        onMounted(() => {
            // console.log('JSZip', JSZip.loadAsync);
            // const zip = new JSZip();
            document
                .getElementById('file')
                .addEventListener('change', (event) => {
                    const file = event.target.files[0];
                    var fr = new FileReader();
                    var filename = file.name;
                    fr.onload = (e) => {
                        const data = e.target.result;
                        console.log('==', filename, e.target.result);
                        // eslint-disable-next-line
                        const ds = new DataStream(data, 0, false);
                        var header = [
                            'signature', 'string:4',
                            'version', 'uint16',
                            'reserved', 'string:6',
                            'channels', 'uint16',
                            'height', 'uint32',
                            'width', 'uint32',
                            'depth', 'uint16',
                            'colormode', 'uint16'
                        ];

                        const headerData = ds.readStruct(header);
                        console.log('==1', ds, headerData);
                        // const layerCount = ds.readUint16();
                        // const len = ds.readUint32();
                        var layerStruct = [
                            'top', 'uint32',
                            'left', 'uint32',
                            'bottom', 'uint32',
                            'right', 'uint32',
                            'channels', 'uint16',
                            'channelsInfo', function(dataStream, struct) {
                                var info = [];
                                for (var i = 0; i < struct.channels; i++) {
                                    info.push(ds.readStruct([
                                        'id', 'uint16',
                                        'len', 'uint32'
                                    ]));
                                // info[i].rgbakey = that.getRGBAType(info[i].id);
                                }
                                return info;
                            },
                            'blendModeSignature', 'string:4',
                            'blendModeKey', 'string:4',
                            // this.blendModeName = this.getBlendModeName();

                            'opacity', 'uint8',
                            'clipping', 'uint8',

                            // TODO: Fix me. This needs to be actual bits
                            // Skiping the Flags
                            'flags', 'uint8',

                            'filler', 'uint8',
                            'lenDataBlendingName', 'uint32'
                        ];

                        const layerInfo = ds.readStruct(layerStruct);

                        // console.log('==len:', len);
                        console.log('==layerCount:', layerInfo);
                        // this.info = new psdJsLayerMaskInfo(psd);
                    };
                    fr.readAsArrayBuffer(file);

                    console.log('file', file);
                    // zip.file(file).then(function(conotent) {
                    //     console.log('conotent==', conotent);
                    // });
                    // JSZip.loadAsync(file)
                    //     .then(function(zip) {
                    //         return zip.file("Hello.txt").async("uint8array");
                    //         // Object.keys(zip.files).map(item => )
                    //         // console.log('zip', zip);
                    //         // return zip.file("file.json").async("uint8array");
                    //     }).then(function(content){
                    //         console.log('content', content);
                    //         // assert.equal(content.buffer.byteLength, 12, "don't get a view of the original buffer");
                    //         // done();
                    //     });
                });
        });

        return {};
    }
});
</script>
