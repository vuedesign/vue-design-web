<template>
    <div
        class="plugin-drop-view"
        :style="style"
        @mousedown="ev => handleMousedown('box', ev)"
        @mouseup="ev => handleMouseup('box', ev)"
    >
        <slot />
        <div
            class="drop-circle-area drop-circle-area-top-left"
            @mousedown="ev => handleMousedown('top-left', ev)"
            @mouseup="ev => handleMouseup('top-left', ev)"
        ></div>
        <div
            class="drop-circle-area drop-circle-area-top-right"
            @mousedown="ev => handleMousedown('top-right', ev)"
            @mouseup="ev => handleMouseup('top-right', ev)"
        ></div>
        <div
            class="drop-circle-area drop-circle-area-bottom-left"
            @mousedown="ev => handleMousedown('bottom-left', ev)"
            @mouseup="ev => handleMouseup('bottom-left', ev)"
        ></div>
        <div
            class="drop-circle-area drop-circle-area-bottom-right"
            @mousedown="ev => handleMousedown('bottom-right', ev)"
            @mouseup="ev => handleMouseup('bottom-right', ev)"
        ></div>
        <div
            class="drop-square-area drop-square-area-top"
            @mousedown="ev => handleMousedown('top', ev)"
            @mouseup="ev => handleMouseup('top', ev)"
        ></div>
        <div
            class="drop-square-area drop-square-area-left"
            @mousedown="ev => handleMousedown('left', ev)"
            @mouseup="ev => handleMouseup('left', ev)"
        ></div>
        <div
            class="drop-square-area drop-square-area-bottom"
            @mousedown="ev => handleMousedown('bottom', ev)"
            @mouseup="ev => handleMouseup('bottom', ev)"
        ></div>
        <div
            class="drop-square-area drop-square-area-right"
            @mousedown="ev => handleMousedown('right', ev)"
            @mouseup="ev => handleMouseup('right', ev)"
        ></div>
        <div class="drop-line drop-line-top"></div>
        <div class="drop-line drop-line-right"></div>
        <div class="drop-line drop-line-bottom"></div>
        <div class="drop-line drop-line-left"></div>
        <div
            class="drop-square-area-move"
            @mousedown="ev => handleMousedown('move', ev)"
            @mouseup="ev => handleMouseup('move', ev)"
        ></div>
    </div>
</template>

<script>
import { defineComponent, computed, reactive, ref, onMounted, toRefs } from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
    name: 'plugin-drop-view',
    props: {
        defaultStyle: {
            type: Object,
            default: () => {
                const width = 100;
                const height = 100;
                const left = document.body.clientWidth / 2 - width / 2;
                const top = document.body.clientHeight / 2 - height / 2;
                return ({
                    width,
                    height,
                    left,
                    top
                });
            }
        }
    },
    emits: ['move', 'init'],
    setup(props, { slots, emit }) {
        const store = useStore();
        const currentDropComponent = computed(() => store.getters['workbench/currentDropComponent']);

        const rect = reactive({
            layerX: 0,
            layerY: 0
        });

        const { defaultStyle } = toRefs(props);
        const { left, top, width, height } = defaultStyle.value;

        const styleData = reactive({
            layerX: 0,
            layerY: 0,
            left,
            top,
            width,
            height,
            cursor: 'default'
        });

        const style = computed(() => {
            return {
                left: `${styleData.left}px`,
                top: `${styleData.top}px`,
                width: `${styleData.width}px`,
                height: `${styleData.height}px`,
                cursor: styleData.cursor
            };
        });

        const isMove = ref(false);
        const dropType = ref('box');

        const event = reactive({
            pageX: 0,
            pageY: 0
        });

        const pluginDropBox = ref();

        onMounted(() => {
            const children = slots.default();
            children.forEach(item => {
                console.log(item);
            });
            console.log('onMounted props children pluginDropBox ======== ', props, children, pluginDropBox.value);
            emit('init', {
                styleData,
                event: null,
                eventType: 'init'
            });
        });

        const doc = document;
        const { clientWidth, clientHeight } = doc.documentElement;

        console.log('clientHeight', clientHeight);

        doc.addEventListener('mouseleave', (ev) => {
            isMove.value = false;
            emit('move', {
                styleData,
                event: ev,
                eventType: 'leave'
            });
        });
        doc.addEventListener('mousemove', (ev) => {
            if (isMove.value) {
                if (dropType.value === 'box' || dropType.value === 'move') {
                    styleData.cursor = 'move';
                    styleData.left = ev.pageX - styleData.layerX;
                    if (styleData.left < 0) {
                        styleData.left = 0;
                    }
                    if (styleData.left > clientWidth - styleData.width) {
                        styleData.left = clientWidth - styleData.width;
                    }
                    styleData.top = ev.pageY - styleData.layerY;
                    if (styleData.top < 0) {
                        styleData.top = 0;
                    }
                    if (styleData.top > clientHeight - styleData.height) {
                        styleData.top = clientHeight - styleData.height;
                    }
                } else if (dropType.value === 'top-left') {
                    styleData.width = styleData.width - (ev.pageX - styleData.layerX - styleData.left);
                    styleData.height = styleData.height - (ev.pageY - styleData.layerY - styleData.top);
                    styleData.left = ev.pageX - styleData.layerX;
                    styleData.top = ev.pageY - styleData.layerY;

                    // if (styleData.left > clientWidth - styleData.width) {
                    //     styleData.left = clientWidth - styleData.width;
                    // }
                    // if (styleData.top > clientHeight - styleData.height) {
                    //     styleData.top = clientHeight - styleData.height;
                    // }
                } else if (dropType.value === 'top-right') {
                    styleData.width = ev.pageX - styleData.left;
                    if (styleData.width > clientWidth - styleData.left) {
                        styleData.width = clientWidth - styleData.left;
                    }
                    styleData.height = styleData.height - (ev.pageY - styleData.top);
                    styleData.top = ev.pageY;
                    // if (styleData.top <= 0) {
                    //     styleData.top = 0;
                    // }
                } else if (dropType.value === 'bottom-left') {
                    styleData.width = styleData.width - (ev.pageX - styleData.left);
                    styleData.height = ev.pageY - styleData.top;
                    styleData.left = ev.pageX;
                } else if (dropType.value === 'bottom-right') {
                    styleData.width = ev.pageX - styleData.left;
                    styleData.height = ev.pageY - styleData.top;
                } else if (dropType.value === 'top') {
                    styleData.height = styleData.height - (ev.pageY - styleData.top);
                    styleData.top = ev.pageY;
                } else if (dropType.value === 'right') {
                    styleData.width = ev.pageX - styleData.left;
                } else if (dropType.value === 'bottom') {
                    styleData.height = ev.pageY - styleData.top;
                } else if (dropType.value === 'left') {
                    styleData.width = styleData.width - (ev.pageX - styleData.left);
                    styleData.left = ev.pageX;
                }
                emit('move', {
                    styleData,
                    event: ev,
                    eventType: 'move'
                });
            } else {
                rect.cursor = 'default';
            }
        });

        const handleMouseup = (type, ev) => {
            console.log('type', type);
            ev.stopPropagation();
            isMove.value = false;
            rect.cursor = 'default';
            emit('init', {
                styleData,
                event: ev,
                eventType: type
            });
        };

        const handleMousedown = (type, ev) => {
            ev.stopPropagation();
            console.log('ev', ev.pageX, ev.layerX, ev);
            // rect.pageX = ev.pageX;
            // rect.pageY = ev.pageY;
            isMove.value = true;
            dropType.value = type;
            if (type === 'box' || type === 'move') {
                styleData.layerX = ev.layerX;
                styleData.layerY = ev.layerY;
                styleData.left = ev.pageX - ev.layerX;
                styleData.top = ev.pageY - ev.layerY;
                styleData.cursor = 'move';
            } else if (type === 'top-left') {
                styleData.layerX = ev.layerX - 3;
                styleData.layerY = ev.layerY - 3;
            } else if (type === 'top-right') {
                styleData.layerX = styleData.width + ev.layerX - 5;
                styleData.layerY = ev.layerY - 4;
            } else if (type === 'bottom-left') {
                styleData.layerX = ev.layerX - 4;
                styleData.layerY = styleData.height + ev.layerY - 5;
            } else if (type === 'bottom-right') {
                styleData.layerX = styleData.width + ev.layerX - 5;
                styleData.layerY = styleData.height + ev.layerY - 5;
            } else if (type === 'top') {
                styleData.layerX = ev.layerX + 9;
                styleData.layerY = ev.layerY - 4;
            } else if (type === 'right') {
                styleData.layerX = styleData.width + ev.layerX - 5;
                styleData.layerY = ev.layerY + 9;
            } else if (type === 'bottom') {
                styleData.layerX = ev.layerX + 9;
                styleData.layerY = styleData.height + ev.layerY - 5;
            } else if (type === 'left') {
                styleData.layerX = ev.layerX - 4;
                styleData.layerY = ev.layerY + 9;
            }
        };

        return {
            currentDropComponent,
            handleMousedown,
            handleMouseup,
            event,
            style,
            styleData,
            pluginDropBox
        };
    }
});
</script>

<style lang="scss" scoped>
.plugin-drop-view {
    position: fixed;
    z-index: 100;
    -webkit-user-drag: none;
    // background-color: rgba(red, .3);

    .drop-circle-area {
        width: 9px;
        height: 9px;
        border: 1px solid red;
        position: absolute;
        border-radius: 5px;
        -webkit-user-drag: none;
        z-index: 3;
    }

    .drop-circle-area-top-left {
        top: -4px;
        left: -4px;
        cursor: nw-resize;
    }
    .drop-circle-area-top-right {
        top: -4px;
        right: -4px;
        cursor: ne-resize;
    }
    .drop-circle-area-bottom-left {
        bottom: -4px;
        left: -4px;
        cursor: sw-resize;
    }
    .drop-circle-area-bottom-right {
        bottom: -4px;
        right: -4px;
        cursor: se-resize;
    }

    .drop-square-area {
        -webkit-user-drag: none;
        position: absolute;
        background-color: transparent;
        z-index: 2;
    }

    .drop-square-area-top {
        height: 9px;
        left: 7px;
        right: 7px;
        top: -4px;
        cursor: n-resize;
    }

    .drop-square-area-right {
        width: 9px;
        top: 7px;
        right: -4px;
        bottom: 7px;
        cursor: e-resize;
    }

    .drop-square-area-bottom {
        height: 9px;
        left: 7px;
        right: 7px;
        bottom: -4px;
        cursor: s-resize;
    }

    .drop-square-area-left {
        width: 9px;
        top: 7px;
        left: -4px;
        bottom: 7px;
        cursor: w-resize;
    }

    .drop-line {
        background-color: red;
        position: absolute;
        -webkit-user-drag: none;
        pointer-events: none;
    }

    .drop-line-top {
        top: 0;
        left: 4px;
        right: 4px;
        height: 1px;
    }

    .drop-line-right {
        top: 4px;
        bottom: 4px;
        right: 0;
        width: 1px;
    }

    .drop-line-bottom {
        bottom: 0;
        left: 4px;
        right: 4px;
        height: 1px;
    }

    .drop-line-left {
        top: 4px;
        bottom: 4px;
        left: 0;
        width: 1px;
    }

    .drop-square-area-move {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background-color: transparent;
        z-index: 1;
    }
}
</style>
