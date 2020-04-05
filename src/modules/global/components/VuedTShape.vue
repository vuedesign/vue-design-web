<template>
    <div class="vued-t-shape">
        <aside class="vued-t-shape-aside">
            <slot name="aside"></slot>
        </aside>
        <header class="vued-t-shape-right-bar">
            <slot name="right-bar"></slot>
        </header>
        <section class="vued-t-shape-body">
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
        height: 100%;
        width: 40px;
        float: right;
    }
    .vued-t-shape-body{
        height: 100%;
        overflow: hidden;
    }
    .vued-t-shape-aside{
        width: auto;
        height: 100%;
        z-index: 1;
        float: left;
        position: relative;
        background-color: #409EFF;
    }
    .vued-t-shape-mainer{
        position: relative;
        height: 100%;
        overflow-x: hidden;
        background-color: #fff;
    }
</style>
