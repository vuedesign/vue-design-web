<template>
    <component
        :is="option.tag"
        v-bind="option.props"
        :id="option.uuid"
        @click="handleSelect"
    >
        <template v-if="option.children && Array.isArray(option.children) && option.children.length > 0">
            <render-component
                v-for="item in option.children"
                :key="item.id"
                :option="item"
            />
        </template>
        <template v-else>
            <div
                v-if="option.slot"
                class="slot"
                :data-uuid="option.uuid"
                style="width: 100%; min-height: 160px;"
                @drop="handleDrop"
                @dragover="handleDragover"
            >
                <span>drop</span>
            </div>
            <template v-else>
                {{ option.children }}
            </template>
        </template>
    </component>
</template>

<script>
import { computed, defineComponent, onMounted } from 'vue';
import { useStore } from 'vuex';
import Tools from './tools';

export default defineComponent({
    name: 'render-component',
    props: {
        option: {
            type: Object,
            default: () => ({})
        },
        currentUuid: {
            type: String,
            default: ''
        }
    },
    emits: ['slot-drop', 'slot-dragover', 'select'],
    setup(props, { emit }) {
        const store = useStore();
        const currentUuid = computed(() => store.getters['building/currentUuid']);
        console.log('currentUuid', currentUuid);

        const handleSelect = (ev) => {
            emit('select', props.option, ev);
        };

        const handleDrop = (ev) => {
            emit('slot-drop', ev);
        };

        const handleDragover = (ev) => {
            emit('slot-dragover', ev);
        };

        onMounted(() => {
            const toolTarget = document.getElementById(props.option.uuid);
            new Tools(toolTarget, {
                select: ({ target, style, event }) => {
                    console.log('target, ev', target, style, event);
                },
                contextmenu: ({ target, y, x }) => {
                    store.commit('building/editor/UPDATE_CONTEXT_MENU_STYLE', {
                        display: 'block',
                        left: `${x}px`,
                        top: `${y}px`,
                    });
                    const uuid = target.dataset.uuid;
                    store.commit('building/editor/UPDATE_CONTEXT_MENU_UUID', uuid);
                    console.log('ddd');
                }
            });
        });

        return {
            handleDrop,
            handleDragover,
            handleSelect
        };
    }
});
</script>

<style lang="scss" scoped>
    .slot {
        border: 1px dashed #aaa;
        display: flex;
        justify-content: center;
        align-items: center;
        span {
            color: #aaa;
        }
    }
</style>
<style lang="scss">
    .tool {
        opacity: 0;

        &.tool-select {
            opacity: 1;
        }
    }
</style>
