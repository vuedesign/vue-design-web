<template>
    <section class="db-collapse">
        <header class="db-collapse-header" @click="handleHeaderClick">
            <h5>{{ title }}</h5>
            <span>
                <caret-right-outlined :rotate="isActive ? 90 : 0" />
            </span>
        </header>
        <section
            class="db-collapse-content"
            ref="root"
            :class="{ 'active': isActive }"
        >
            <div ref="rootInner" class="db-collapse-content-inner">
                <slot />
            </div>
        </section>
    </section>
</template>

<script>
import { ref, onMounted } from 'vue';
import {
    CaretRightOutlined
} from '@ant-design/icons-vue';

export default {
    name: 'db-collapse',
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
        }
    },
    setup(props, { emit }) {
        const root = ref(null);
        const rootInner = ref(null);

        onMounted(() => {
            root.value.style.height = props.isActive ? `${rootInner.value.clientHeight}px` : 0;
        });

        const handleHeaderClick = () => {
            root.value.style.height = props.isActive ? 0 : `${rootInner.value.clientHeight}px`;
            emit('update:isActive', !props.isActive);
        };

        return {
            handleHeaderClick,
            root,
            rootInner
        };
    }
};
</script>

<style lang="scss" scoped>
    .db-collapse {
        background-color: #fff;
    }

    .db-collapse-header {
        // background-color: #fefefe;
        padding: 0 16px;
        height: 32px;
        line-height: 32px;
        display: flex;
        justify-content: space-between;
        cursor: pointer;

        h5 {
            color: #555;
        }

        span {
            color: #397097;
        }
    }

    .db-collapse-content {
        height: 0;
        overflow: hidden;
        transition: all .5s;
    }

    .db-collapse-content-inner {
        width: 100%;
    }
</style>
