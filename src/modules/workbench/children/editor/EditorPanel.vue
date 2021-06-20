<template>
    <div
        id="editor-panel"
        class="editor-panel"
        :style="{
            transform: `translate(${position.tx}px, ${position.ty}px) scale(${position.scale})`,
            width: `${position.width + 10}px`,
            height: `${position.height + panelHeight + 10}px`,
        }"
    >
        <header
            class="editor-panel-header"
            :style="{
                height: `${panelHeight}px`,
                lineHeight: `${panelHeight}px`
            }"
            @click.stop="handleSelect"
        >
            <h5>{{ pageName }}</h5>
            <span>{{ position.width }} X {{ position.height }}</span>
        </header>
        <section
            id="editor-panel-content"
            class="editor-panel-content"
            :style="{
                width: `${position.width}px`,
                height: `${position.height}px`
            }"
        >
            <slot />
        </section>
    </div>
</template>
<script>
import { computed, onMounted, defineComponent } from 'vue';
import { useStore } from 'vuex';
// import Gesto from 'gesto';
// import keyboardJS from 'keyboardjs';

const EDITOR_PANEL_HEADER_HEIGHT = 24;

export default defineComponent({
    name: 'editor-panel',
    setup() {
        const store = useStore();
        const position = computed(() => store.getters['workbench/editor/position']);
        const pageName = computed(() => store.getters['workbench/editor/pageName']);
        // const isMove = ref(false);

        const handleSelect = () => {
            store.commit('workbench/config/UPDATE_CURRENT_CONFIG', 'config-page');
        };

        onMounted(() => {
            // const targets = Array.from(document.querySelectorAll('.editor-panel'));
            // keyboardJS.bind('space', () => {
            //     isMove.value = true;
            // });
            // document.addEventListener('mouseup', () => {
            //     isMove.value = false;
            // });
            // window.getso = new Gesto(targets, {
            //     container: window,
            //     pinchOutside: false,
            // }).on('drag', e => {
            //     if (isMove.value) {
            //         store.commit('workbench/editor/POSITION', {
            //             tx: position.value.tx + e.deltaX,
            //             ty: position.value.ty + e.deltaY
            //         });
            //     }
            // });
        });

        return {
            position,
            pageName,
            panelHeight: EDITOR_PANEL_HEADER_HEIGHT,
            handleSelect
        };
    }
});
</script>

<style lang="scss" scoped>
.editor-panel {
    position: relative;
    padding: 5px;
    background-color: #f9f9f9;
    box-shadow: 0 0 1px 2px rgba(0, 0, 0, .01);
    border-radius: 3px;
    overflow: hidden;
}

.editor-panel-header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    h5 {
        color: #999;
    }
    span {
        color: #999;
        font-size: 13px;
    }
}

.editor-panel-content {
    background-color: #f9f9f9;
    overflow: hidden;
    position: relative;
}
</style>
