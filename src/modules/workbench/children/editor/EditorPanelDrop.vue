
<template>
    <draggable
        v-model="children"
        :component-data="{ class: 'editor-panel-drop' }"
        :group="{ name: 'views', put: ['views', 'components'] }"
        item-key="uuid"
        @change="handleLog"
    >
        <template #item="{ element }">
            <render-component :config="element" />
        </template>
    </draggable>
</template>
<script>
import { computed, defineComponent } from 'vue';

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
        const handleLog = () => {};

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
            children
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
}
</style>
