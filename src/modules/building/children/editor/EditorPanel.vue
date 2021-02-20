<template>
    <div
        id="editor-panel"
        class="editor-panel"
        :style="{
            transform: `translate(${position.tx}px, ${position.ty}px) scale(${position.scale})`,
            width: `${position.width}px`,
            height: `${position.height + panelHeight}px`,
        }"
    >
        <header
            class="editor-panel-header"
            :style="{
                height: `${panelHeight}px`,
                lineHeight: `${panelHeight}px`
            }"
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
import Gesto from 'gesto';

const EDITOR_PANEL_HEADER_HEIGHT = 24;

export default defineComponent({
    name: 'icon-tools',
    setup() {
        const store = useStore();
        const position = computed(() => store.getters['building/editor/position']);
        const pageName = computed(() => store.getters['building/editor/pageName']);

        onMounted(() => {
            const targets = Array.from(document.querySelectorAll('.editor-panel'));
            window.getso = new Gesto(targets, {
                container: window,
                pinchOutside: true,
            }).on('drag', e => {
                store.commit('building/editor/POSITION', {
                    tx: position.value.tx + e.deltaX,
                    ty: position.value.ty + e.deltaY
                });
            });
        });

        return {
            position,
            pageName,
            panelHeight: EDITOR_PANEL_HEADER_HEIGHT
        };
    }
});
</script>

<style lang="scss" scoped>
.editor-panel {
    position: relative;

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
    box-shadow: 0 0 1px 2px rgba(0, 0, 0, .01);
    position: relative;
}
</style>
