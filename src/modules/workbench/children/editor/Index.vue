<template>
    <editor-panel>
        <!-- <div id="editor-panel-tools">
            <div
                class="vd-page"
                :style="currentPageStyle"
                @drop="handleDrop"
                @dragover="handleDropover"
                @dragenter="handleDragenter"
            >
            </div>
            <context-menu />
        </div> -->
        <!-- <editor-panel-preview></editor-panel-preview> -->
    </editor-panel>
</template>

<script>
import { computed, defineComponent } from 'vue';
import { useStore } from 'vuex';
import { v4 as uuidv4 } from 'uuid';
import EditorPanel from './EditorPanel.vue';
// import RenderComponent from './RenderComponent.vue';
// import ContextMenu from './ContextMenu.vue';
// import EditorPanelPreview from './EditorPanelPreview.vue';
import COMPONENT_LIST from '../component/componentList';

export default defineComponent({
    name: 'workbench-content',
    components: {
        EditorPanel,
        // RenderComponent,
        // ContextMenu,
        // EditorPanelPreview
    },
    setup() {

        const store = useStore();
        const componentTree = computed(() => store.getters['workbench/componentTree']);
        const currentPageStyle = computed(() => store.getters['workbench/currentPageStyle']);

        console.log('componentTreeOptions', componentTree);

        // let flag = false;
        let currentTargetUuid = null;

        // function createDragger(uuid, style) {
        //     let div = document.getElementById(uuid);
        //     if (!div) {
        //         div = document.createElement('div');
        //     }
        //     div.id = uuid;
        //     div.style.border = '1px solid #eafe22';
        //     div.style.position = 'fixed';
        //     for(let i in style) {
        //         div.style[i] = style[i];
        //     }
        //     if (!document.getElementById(uuid)) {
        //         document.body.appendChild(div);
        //     }
        // }

        const handleDrop = (event) => {
            event.preventDefault();
            event.stopPropagation();
            if (document.querySelector('.drop-cache')) {
                document.querySelector('.drop-cache').remove();
            }
            const id = event.dataTransfer.getData('text');
            console.log('componentList.value', COMPONENT_LIST, id);
            let options = {};

            COMPONENT_LIST.forEach(item => {
                if (item && item.children && item.children.length > 0) {
                    const current = item.children.find(i => i.value === id);
                    if (current) {
                        console.log('current', current.options);
                        Object.assign(options, current.options, {
                            uuid: uuidv4()
                        });
                    }
                }
            });
            console.log('options', options);
            store.commit('workbench/ADD_COMPONENT', {
                uuid: currentTargetUuid,
                options,
                slot: true
            });

            // createDragger(options.uuid, {
            //     left: '200px',
            //     top: '100px',
            //     width: '200px',
            //     height: '50px'
            // });

            store.commit('workbench/UPDATE_CURRENT_UUID', options.uuid);

            console.log('2', currentTargetUuid);
        };

        const handleDropover = (event) => {
            event.preventDefault();
            // console.log('1', currentTargetUuid);
            // if (!flag) {
            //     flag = true;
            //     const id = event.dataTransfer.getData('text');
            //     console.log('event', id);
            //     console.log('event', event);
            //     const newItem = document.createElement('div');
            //     newItem.className = 'drop-cache';
            //     newItem.innerHTML = '======';
            //     event.target.appendChild(newItem);
            // }
        };

        const handleDragenter = (event) => {
            event.preventDefault();
            console.log('handleDragenter', event);
            currentTargetUuid = event.target.dataset.uuid;
            console.log('1', currentTargetUuid);
        };

        const handleSelect = item => {
            console.log('item', item);
        };

        return {
            componentTree,
            currentPageStyle,
            handleDrop,
            handleDropover,
            handleDragenter,
            handleSelect
        };
    }
});
</script>

<style scoped lang="scss">
.vd-page {
    position: relative;
    width: 100%;
    height: 100%;
    display: block;
}

</style>
<style lang="scss">
.vd-page {
    overflow: hidden;
    .drop-cache {
        display: block;
        width: 100%;
        height: 20px;
        background-color: cornflowerblue;
    }
}

#editor-panel-tools {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 2;
    // background-color: #fff;
}
</style>
