<template>
    <div class="vued-t-shape">
        <header class="vued-t-shape-header">
            <slot name="header"></slot>
        </header>
        <section class="vued-t-shape-body">
            <aside v-if="$slots.aside" class="vued-t-shape-aside">
                <slot name="aside"></slot>
            </aside>
            <section class="vued-t-shape-mainer">
                <slot name="breadcrumb" v-if="$slots.breadcrumb"></slot>
                <slot name="body"></slot>
            </section>
        </section>
    </div>
</template>

<script>
export default {
    name: 'vued-t-shape',
    created() {
        document.getElementsByTagName('html')[0].setAttribute('class', 'admin');
    }
};
</script>

<style scoped>
    .vued-t-shape{
        height: 100%;
        width: 100%;
    }
    .vued-t-shape-header{
        height: 48px;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        z-index: 2;
        background-color: #3392e2;
    }
    .vued-t-shape-body{
        position: absolute;
        top: 48px;
        width: 100%;
        left: 0;
        bottom: 0;
    }
    .vued-t-shape-aside{
        width: 200px;
        height: 100%;
        z-index: 1;
        border-right: 1px solid #eee;
        float: left;
        overflow-x: hidden;
    }
    .vued-t-shape-mainer{
        position: relative;
        height: 100%;
        overflow-x: hidden;
    }
</style>
