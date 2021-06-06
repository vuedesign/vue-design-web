<template>
    <section class="vd-collapse">
        <header class="vd-collapse-header" @click="handleHeaderClick">
            <h5>{{ title }}</h5>
            <span>
                <caret-right-outlined :rotate="isActive ? 90 : 0" />
            </span>
        </header>
        <section
            ref="root"
            class="vd-collapse-content"
            :class="{ 'active': isActive }"
        >
            <div class="vd-collapse-content-inner">
                <slot />
            </div>
        </section>
    </section>
</template>

<script>
import { ref, onMounted, watchEffect } from 'vue';
import {
    CaretRightOutlined
} from '@ant-design/icons-vue';

export default {
    name: 'vd-collapse',
    components: {
        CaretRightOutlined
    },
    props: {
        isActive: {
            type: Boolean,
            default: false
        },
        title: {
            type: String,
            default: ''
        },
        itemHeight: {
            type: Number,
            default: 100
        },
        itemNum: {
            type: Number,
            default: 1
        }
    },
    emits: ['update:isActive'],
    setup(props, { emit }) {
        const root = ref(null);

        function updateStyle(isActive) {
            if (root.value?.style) {
                root.value.style.height = isActive ? `${props.itemHeight * props.itemNum}px` : 0;
            }
        }

        onMounted(() => {
            updateStyle(props.isActive);
        });

        watchEffect(() => {
            updateStyle(props.isActive);
        });

        const handleHeaderClick = () => {
            const isActive = !props.isActive;
            updateStyle(isActive);
            emit('update:isActive', isActive);
        };

        return {
            handleHeaderClick,
            root
        };
    }
};
</script>

<style lang="scss" scoped>
    .vd-collapse {
        background-color: #fff;
    }

    .vd-collapse-header {
        // background-color: #fefefe;
        padding: 0 8px;
        height: 32px;
        line-height: 32px;
        display: flex;
        justify-content: space-between;
        cursor: pointer;

        h5 {
            color: #555;
        }

        span {
            color:#c6e4ff;
        }
    }

    .vd-collapse-content {
        height: 0;
        overflow: hidden;
        transition: all .5s;
    }

    .vd-collapse-content-inner {
        width: 100%;
    }
</style>
