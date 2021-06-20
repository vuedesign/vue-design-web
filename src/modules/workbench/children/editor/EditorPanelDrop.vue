
<template>
    <draggable
        v-model="children"
        :component-data="{ class: 'editor-panel-drop' }"
        :group="{ name: 'views', pull: true, put: ['views', 'components'] }"
        item-key="uuid"
        @change="handleLog"
        @choose="hanldeSelect"
    >
        <template #item="{ element }">
            <render-component :config="element" />
        </template>
    </draggable>
</template>
<script>
import { computed, defineComponent } from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
    name: 'editor-panel-drop',
    props: {
        modelValue: {
            type: Array,
            default: () => []
        }
    },
    emits: ['update:modelValue'],
    setup(props, { emit }) {
        const store = useStore();
        const handleLog = (data) => {
            console.log('handleLog:=', data);
        };

        const hanldeSelect = (data) => {
            if (data.item.dataset.uuid) {
                store.commit('workbench/UPDATE_CURRENT_UUID', data.item.dataset.uuid);
            }
            console.log('hanldeSelect', data.item.dataset.uuid);
        };

        const children = computed({
            get() {
                return props.modelValue;
            },
            set(val) {
                emit('update:modelValue', val);
            }
        });

        return {
            handleLog,
            children,
            hanldeSelect
        };
    }
});
</script>

<style lang="scss" scoped>
.editor-panel-drop {
    background-color: #fff;
    position: absolute;
    width: 100%;
    height: 100%;
    border: none;
    top: 0;
    left: 0;
    z-index: 10;
    font-size: 0;
}
</style>
