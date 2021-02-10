<template>
    <div class="config-radio-group">
        <a-radio-group
            v-model:value="data"
            button-style="solid"
            size="small"
        >
            <a-radio-button
                v-for="item in options"
                :key="item.value"
                :value="item.value"
            >{{ item.label }}</a-radio-button>
        </a-radio-group>
    </div>
</template>

<script>
import { defineComponent, computed } from 'vue';

export default defineComponent({
    name: 'config-radio-group',
    props: {
        options: {
            type: Array,
            default: () => []
        },
        value: {
            type: [Number, String]
        }
    },
    setup(props, { emit }) {
        const data = computed({
            set(value) {
                emit('update:value', value);
            },
            get() {
                return props.value;
            }
        });

        return {
            data
        };
    }
});
</script>

<style lang="scss" scoped>
.config-radio-group {
    background-color: transparent;
}
</style>
<style lang="scss" >
.config-radio-group {
    .ant-radio-group {
        font-size: 12px;
    }
}
</style>
