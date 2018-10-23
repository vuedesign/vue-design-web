<template>
    <div class="vued-t-shape">
        <header class="vued-t-shape-header">
            <slot name="header"></slot>
        </header>
        <aside class="vued-t-shape-aside">
            <slot name="aside"></slot>
        </aside>
        <section class="vued-t-shape-mainer">
            <slot name="body"></slot>
        </section>
    </div>
</template>

<script>
export default {
    data() {
        return {
            msg: 'hello vue'
        };
    }
};
</script>

<style scoped>
    .vued-t-shape{
        height: 100%;
    }
    .vued-t-shape-header{
        height: 48px;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        z-index: 2;
        background-color: steelblue;
    }
    .vued-t-shape-aside{
        position: absolute;
        top: 0;
        left: 0;
        width: 200px;
        height: 100%;
        padding-top: 48px;
        z-index: 1;
        border-right: 1px solid #eee;
    }
    .vued-t-shape-mainer{
        padding-top: 48px;
        height: 100%;
        padding-left: 200px;
        overflow-y: hidden;
        overflow-x: scroll;
    }
</style>
