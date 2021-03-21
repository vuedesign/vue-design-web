<template>
    <div class="plugin-drop-handler-list">
        <ul>
            <li
                v-for="item in componentList"
                :key="item"
            >
                <component
                    :is="item"
                    @mousedown="handleMousedown"
                    @mouseup="handleMouseup"
                />
            </li>
        </ul>
    </div>
</template>

<script>
import { defineComponent, defineAsyncComponent, ref, reactive, computed } from 'vue';
import { useStore } from 'vuex';

const modules = import.meta.glob(`/src/modules/plugins/**/Handler.vue`);

const components = {};
const componentKeyList = [];
Object.keys(modules).forEach(key => {
    const keyName = key.replace('.vue', '');
    const keyList = keyName.split('/').map(item => item.toLowerCase());
    const ckey = keyList.splice(keyList.length - 2, 3);
    ckey.unshift('plugin');
    const keyStr = ckey.join('-');
    componentKeyList.push(keyStr);
    components[keyStr] = defineAsyncComponent(modules[key]);
});

console.log('components', components);
export default defineComponent({
    name: 'plugin-drop-handler-list',
    components: {
        ...components,
    },
    setup(props, context) {
        const doc = document;
        const store = useStore();
        const viewIframe = computed(() => store.getters['workbench/viewIframe']);
        console.log('context=======', context);
        const componentList = ref(componentKeyList);
        const isMove = ref(false);
        const currentConeTargetCache = ref(null);
        const currentCloneTargetCacheRect = reactive({
            layerX: 0,
            layerY: 0,
            width: 0,
            height: 0
        });

        const currentTargetCacheRect = reactive({
            left: 0,
            top: 0,
            width: 0,
            height: 0
        });

        const handleMouseup = (ev) => {
            isMove.value = false;
            console.log('handleMouseup', ev);
            removeCloneTaregt(ev);
        };

        function getTransitionDurationTime(event, currentTargetCacheRect) {
            const a = Math.abs((event.pageX - event.layerX) - currentTargetCacheRect.left);
            const b = Math.abs((event.pageY - event.layerY) - currentTargetCacheRect.top);
            const a2 = Math.pow(a, 2);
            const b2 = Math.pow(b, 2);
            const c = Math.sqrt(a2 + b2);
            const transitionDurationTime = (c / 1000).toFixed(3);
            return parseFloat(transitionDurationTime);
        }

        function removeCloneTaregt(event) {
            const target = currentConeTargetCache.value;
            // target.removeEventListener('mouseup', handleMouseup);
            const transitionDurationTime = getTransitionDurationTime(event, currentTargetCacheRect);
            target.style.transitionProperty = `all`;
            target.style.transitionDuration = `${transitionDurationTime}s`;
            target.style.transitionTimingFunction = 'ease-out';
            target.style.left = `${currentTargetCacheRect.left}px`;
            target.style.top = `${currentTargetCacheRect.top}px`;
            target.style.width = `${currentTargetCacheRect.width}px`;
            target.style.height = `${currentTargetCacheRect.height}px`;
            console.log('transitionDurationTime', transitionDurationTime);
            if (transitionDurationTime < 0.005) {
                target.remove();
            }
            target.addEventListener('transitionend', () => {
                target.remove();
            });
        }

        doc.addEventListener('mousemove', (ev) => {
            // console.log('currentCloneTargetCacheRect', currentCloneTargetCacheRect);
            const currentTarget = currentConeTargetCache.value;
            if (currentTarget && isMove.value && viewIframe.value) {
                currentTarget.style.left = `${ev.pageX - currentCloneTargetCacheRect.layerX}px`;
                currentTarget.style.top = `${ev.pageY - currentCloneTargetCacheRect.layerY}px`;
                const viewIframeRect = viewIframe.value.getBoundingClientRect();
                const currentTargetRect = currentTarget.getBoundingClientRect();
                if (viewIframeRect.left - (currentTargetRect.left + currentTargetRect.width) <= 0) {
                    currentTarget.width = `${viewIframeRect.left - currentTargetRect.left}px`;
                } else {
                    currentTarget.width = `${currentCloneTargetCacheRect.width}px`;
                    currentTarget.height = `${currentCloneTargetCacheRect.height}px`;
                }
            }
        });

        function setCurrentTargetCacheRect(
            targetCacheRect,
            mousedownEvent,
            currentTarget
        ) {
            targetCacheRect.layerX = mousedownEvent.layerX;
            targetCacheRect.layerY = mousedownEvent.layerY;
            targetCacheRect.width = currentTarget.clientWidth;
            targetCacheRect.height = currentTarget.clientHeight;
        }

        function cloneDropTarget(target, ev) {
            const cloneItem = target.cloneNode(true);
            console.log('cloneItem', cloneItem);
            cloneItem.id = 'current-drop-plugin';
            cloneItem.style.position = 'fixed';
            cloneItem.style.left = `${ev.pageX - ev.layerX}px`;
            cloneItem.style.top = `${ev.pageY - ev.layerY}px`;
            cloneItem.style.height = `${target.clientHeight}px`;
            cloneItem.style.width = `${target.clientWidth}px`;
            cloneItem.style.backgroundColor = 'rgb(0 0 0 / 5%)';
            cloneItem.style.fontWeight = 400;
            cloneItem.addEventListener('mouseup', handleMouseup);
            return cloneItem;
        }

        const handleMousedown = (ev) => {
            const target = ev.path.find(item => {
                return item.classList && item.classList.contains('plugin-drop-handler');
            });
            if (!target) {
                return;
            }

            console.log('target', target);

            setCurrentTargetCacheRect(
                currentCloneTargetCacheRect,
                ev,
                target
            );

            const currentRect = target.getBoundingClientRect();

            currentTargetCacheRect.left = currentRect.left;
            currentTargetCacheRect.top = currentRect.top;
            currentTargetCacheRect.width = currentRect.width;
            currentTargetCacheRect.height = currentRect.height;

            console.log('currentRect', currentRect, currentTargetCacheRect);

            // setCurrentTargetCacheRect(
            //     currentTargetCacheRect,
            //     ev,
            //     target
            // );

            console.log('currentCloneTargetCacheRect', currentCloneTargetCacheRect);

            const cloneItem = cloneDropTarget(target, ev);
            currentConeTargetCache.value = cloneItem;

            if (currentConeTargetCache.value) {
                doc.body.appendChild(currentConeTargetCache.value);
            }
            isMove.value = true;
        };

        return {
            componentList,
            handleMousedown,
            handleMouseup
        };
    }
});
</script>

<style lang="scss" scoped>
.plugin-drop-handler-list {
    position: relative;
    z-index: 100;
    -webkit-user-drag: none;

    ul {
        padding: 10px;
    }

    li {
        line-height: 36px;
    }
}
</style>
