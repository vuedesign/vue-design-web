<template>
    <main class="design-panel-main">
        <slot />
    </main>
</template>

<script>
export default {
    name: 'design-panel-main'
};
</script>

<style lang="scss" scope>
    .design-panel-main {
        flex: 1;
        width: 100%;
        overflow: hidden;
    }
</style>
