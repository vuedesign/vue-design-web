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
            <dl v-if="display === 'flex'" class="children">
                <dt>弹性反向</dt>
                <dd>
                    <config-radio-group
                        v-model:value="flexDirection"
                        :options="flexDirectionOptions"
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
            <section
                v-if="size === 'custom'"
                class="children"
            >
                <a-space>
                    <a-input
                        v-model:value="width"
                        size="small"
                    >
                        <template #prefix>
                            <span>W</span>
                        </template>
                    </a-input>
                    <a-input
                        v-model:value="height"
                        size="small"
                    >
                        <template #prefix>
                            <span>H</span>
                        </template>
                    </a-input>
                </a-space>
            </section>
            <dl class="border-top">
                <dt>位置</dt>
                <dd>
                    <config-radio-group
                        v-model:value="position"
                        :options="positionOptions"
                    />
                </dd>
            </dl>
            <section
                v-if="position === 'custom'"
                class="children"
            >
                <a-space>
                    <a-input
                        v-model:value="left"
                        size="small"
                    >
                        <template #prefix>
                            <span>X</span>
                        </template>
                    </a-input>
                    <a-input
                        v-model:value="top"
                        size="small"
                    >
                        <template #prefix>
                            <span>Y</span>
                        </template>
                    </a-input>
                </a-space>
            </section>
        </section>
    </layout-panel>
</template>

<script>
import { computed, watch } from 'vue';
import { useStore } from 'vuex';
import LayoutPanel from '@modules/workbench/components/LayoutPanel.vue';
import Tools from '../../editor/tools';

export default {
    name: 'config-page',
    components: {
        LayoutPanel
    },
    setup() {
        const store = useStore();
        const currentPageStyle = computed(() => store.getters['workbench/currentPageStyle']);
        const currentPageCustomState = computed(() => store.getters['workbench/currentPageCustomState']);

        const display = computed({
            set(display) {
                store.commit('workbench/UPDATE_CURRENT_PAGE_STYLE', {
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

        const flexDirection = computed({
            set(flexDirection) {
                store.commit('workbench/UPDATE_CURRENT_PAGE_STYLE', {
                    flexDirection
                });
            },
            get() {
                return currentPageStyle.value.flexDirection;
            }
        });
        const flexDirectionOptions = [
            { value: 'row', label: '水平' },
            { value: 'column', label: '垂直' }
        ];

        const size = computed({
            set(size) {
                if (size === 'default') {
                    store.commit('workbench/UPDATE_CURRENT_PAGE_STYLE', { width: '100%', height: '100%' });
                }
                store.commit('workbench/UPDATE_CURRENT_PAGE_CUSTOM_STATE', { size });
            },
            get() {
                return currentPageCustomState.value.size;
            }
        });

        const sizeOptions = [
            { value: 'default', label: '默认' },
            { value: 'custom', label: '定义' },
        ];

        const width = computed({
            set(width) {
                store.commit('workbench/UPDATE_CURRENT_PAGE_STYLE', { width });
            },
            get() {
                return currentPageStyle.value.width;
            }
        });

        const height = computed({
            set(height) {
                store.commit('workbench/UPDATE_CURRENT_PAGE_STYLE', { height });
            },
            get() {
                return currentPageStyle.value.height;
            }
        });

        const position = computed({
            set(position) {
                if (position === 'default') {
                    store.commit('workbench/UPDATE_CURRENT_PAGE_STYLE', { left: 0, top: 0 });
                }
                store.commit('workbench/UPDATE_CURRENT_PAGE_CUSTOM_STATE', { position });
            },
            get() {
                return currentPageCustomState.value.position;
            }
        });

        const positionOptions = [
            { value: 'default', label: '默认' },
            { value: 'custom', label: '定义' },
        ];

        const left = computed({
            set(left) {
                store.commit('workbench/UPDATE_CURRENT_PAGE_STYLE', { left });
            },
            get() {
                return currentPageStyle.value.left;
            }
        });

        const top = computed({
            set(top) {
                store.commit('workbench/UPDATE_CURRENT_PAGE_STYLE', { top });
            },
            get() {
                return currentPageStyle.value.top;
            }
        });

        const componentTree = computed(() => store.getters['workbench/componentTree']);

        watch([
            display,
            flexDirection,
            left,
            top
        ], () => {
            componentTree.value.forEach(item => {
                const toolTarget = document.getElementById(item.uuid);
                setTimeout(() => {
                    new Tools(toolTarget);
                }, 0);
            });
        });

        return {
            currentPageStyle,
            displayOptions,
            display,
            flexDirection,
            flexDirectionOptions,
            size,
            sizeOptions,
            width,
            height,
            position,
            positionOptions,
            left,
            top,
            currentPageCustomState
        };
    }
};
</script>

<style lang="scss" scoped>
.config-page-content {
    background-color: transparent;

    .children {
        padding: 0 8px 8px 8px;
    }

    dl {
        display: flex;
        padding: 8px;
        justify-content: space-between;
        margin: 0;
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
