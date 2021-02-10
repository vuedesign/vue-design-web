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
                    <a-checkbox
                        v-model:checked="size.width"
                        size="small"
                        @change="handleWidth"
                    >W</a-checkbox>
                    <a-checkbox v-model:checked="size.height" size="small">H</a-checkbox>
                </dd>
            </dl>
            <dl class="children" v-if="size.width">
                <dt>W</dt>
                <dd>
                    <a-input size="small" v-model:value="width" />
                </dd>
            </dl>
            <dl class="children" v-if="size.height">
                <dt>H</dt>
                <dd>
                    <a-input size="small" v-model:value="height" />
                </dd>
            </dl>
        </section>
    </layout-panel>
</template>

<script>
import { computed, reactive } from 'vue';
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
            { value: 'flex', label: '弹性' },
            { value: 'block', label: '默认' }
        ];

        const size = reactive({
            width: false,
            height: false
        });

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

        const handleWidth = (event) => {
            console.log('event', event);
            // let width;
            // if (event.target.checked) {
            //     width ='';
            // } else {
            //     width = '100%';
            // }
            // store.commit('building/UPDATE_CURRENT_PAGE_STYLE', { width });
        };

        return {
            currentPageStyle,
            displayOptions,
            display,
            size,
            width,
            handleWidth,
            height
        };
    }
};
</script>

<style lang="scss" scoped>
.config-page-content {
    background-color: transparent;

    dl {
        display: flex;
        padding: 5px 8px;
        justify-content: space-between;
        margin: 0;
        &.children {
            padding-left: 24px;
        }
        &.border-top {
            border-top: 1px solid #f9f9f9;
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
    }
}
</style>
