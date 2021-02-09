<template>
    <component
        :is="option.tag"
        v-bind="option.props"
    >
        <template v-if="option.children && Array.isArray(option.children) && option.children.length > 0">
            <render-component
                v-for="item in option.children"
                :key="item.id"
                :option="item"
            />
        </template>
        <template v-else>
            {{ option.children }}
        </template>
    </component>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'render-component',
    props: {
        option: {
            type: Object,
            default: () => ({})
        }
    }
});
</script>
