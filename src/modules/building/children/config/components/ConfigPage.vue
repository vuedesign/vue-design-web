<template>
    <layout-panel
        class="config-page"
        title="页面配置"
    >
        <section class="config-page-content">
            <dl>
                <dt>布局</dt>
                <dd>
                    <config-radio-group
                        v-model:value="display"
                        :options="displayOptions"
                    />
                </dd>
            </dl>
            <dl class="border-top">
                <dt>大小</dt>
                <dd>
                    <config-radio-group
                        v-model:value="size"
                        :options="sizeOptions"
                    />
                </dd>
            </dl>
            <ul class="children" v-if="size === 'custom'">
                <li>
                    <a-input
                        size="small"
                        v-model:value="width"
                    >
                        <template #prefix>
                            <span>W</span>
                        </template>
                    </a-input>
                </li>
                <li>
                    <a-input
                        size="small"
                        v-model:value="height"
                    >
                        <template #prefix>
                            <span> H</span>
                        </template>
                    </a-input>
                </li>
            </ul>
            <dl class="border-top">
                <dt>位置</dt>
                <dd>
                    <config-radio-group
                        v-model:value="position"
                        :options="positionOptions"
                    />
                </dd>
            </dl>
            <ul class="children" v-if="position === 'custom'">
                <li>
                    <a-input
                        size="small"
                        v-model:value="left"
                    >
                        <template #prefix>
                            <span>X</span>
                        </template>
                    </a-input>
                </li>
                <li>
                    <a-input
                        size="small"
                        v-model:value="top"
                    >
                        <template #prefix>
                            <span>Y</span>
                        </template>
                    </a-input>
                </li>
            </ul>
        </section>
    </layout-panel>
</template>

<script>
import { computed, ref } from 'vue';
import { useStore } from 'vuex';
import LayoutPanel from '@modules/building/components/LayoutPanel';

export default {
    name: 'config-page',
    components: {
        LayoutPanel
    },
    setup() {
        const store = useStore();
        const currentPageStyle = computed(() => store.getters['building/currentPageStyle']);

        const display = computed({
            set(display) {
                store.commit('building/UPDATE_CURRENT_PAGE_STYLE', {
                    display
                });
            },
            get() {
                return currentPageStyle.value.display;
            }
        });
        const displayOptions = [
            { value: 'block', label: '默认' },
            { value: 'flex', label: '弹性' }
        ];

        const size = ref('default');
        const sizeOptions = [
            { value: 'default', label: '默认' },
            { value: 'custom', label: '定义' },
        ];

        const width = computed({
            set(width) {
                store.commit('building/UPDATE_CURRENT_PAGE_STYLE', { width });
            },
            get() {
                return currentPageStyle.value.width;
            }
        });

        const height = computed({
            set(height) {
                store.commit('building/UPDATE_CURRENT_PAGE_STYLE', { height });
            },
            get() {
                return currentPageStyle.value.height;
            }
        });

        const position = ref('default');
        const positionOptions = [
            { value: 'default', label: '默认' },
            { value: 'custom', label: '定义' },
        ];

        const left = computed({
            set(left) {
                store.commit('building/UPDATE_CURRENT_PAGE_STYLE', { left });
            },
            get() {
                return currentPageStyle.value.left;
            }
        });

        const top = computed({
            set(top) {
                store.commit('building/UPDATE_CURRENT_PAGE_STYLE', { top });
            },
            get() {
                return currentPageStyle.value.top;
            }
        });

        return {
            currentPageStyle,
            displayOptions,
            display,
            size,
            sizeOptions,
            width,
            height,
            position,
            positionOptions,
            left,
            top
        };
    }
};
</script>

<style lang="scss" scoped>
.config-page-content {
    background-color: transparent;

    dl {
        display: flex;
        padding: 8px;
        justify-content: space-between;
        margin: 0;
        &.children {
            padding-left: 24px;
        }
        &.border-top {
            border-top: 1px solid #f9f9f9;
        }
        &.line-tow {
            dt {
                flex: 2;
            }
            dd {
                flex: 5;
            }
        }
    }

    dt {
        font-size: 12px;
        height: 24px;
        line-height: 24px;
    }

    dd {
        margin: 0;
        display: flex;
        align-items: center;
        &.clomn {
            flex-direction: column;
        }
    }

    ul {
        display: flex;
        padding: 8px;
        margin: 0;
        &.children {
            padding-left: 16px;
            li {
                padding-left: 8px;
                flex: 1;
            }
        }
    }
}
</style>
