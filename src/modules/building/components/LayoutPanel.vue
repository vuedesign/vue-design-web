<template>
    <section class="layout-panel">
        <header class="layout-panel-header">
            <h4>{{ title }}</h4>
            <ul>
                <slot name="tools" />
            </ul>
        </header>
        <section class="layout-panel-content">
            <slot />
        </section>
    </section>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'layout-panel',
    props: {
        title: {
            type: String,
            default: ''
        }
    },
    setup() {
    }
});
</script>

<style lang="scss" scoped>
.layout-panel {
    display: flex;
    width: 100%;
    height: 100%;
    flex-direction: column;
}

.layout-panel-header {
    height: 32px;
    line-height: 32px;
    background-color: #f9f9f9;
    padding: 0 8px;
    border-bottom: 1px solid #e8eef3;
    display: flex;

    h4 {
        font-size: 13px;
        font-weight: 400;
    }

    > ul {
        flex: 1;
        justify-content: flex-end;
        display: flex;
    }
}

.layout-panel-content {
    flex: 1;
    overflow: hidden;
    display: flex;
    flex-direction: column;
}
</style>
<style lang="scss">
.layout-panel-header {
    .btn-item {
        padding: 0 5px;
        cursor: pointer;
    }
}
</style>
