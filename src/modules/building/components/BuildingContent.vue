<template>
    <a-layout-content class="building-content">
        <editor />
    </a-layout-content>
</template>

<script>
import Editor from '../children/editor/Index';

export default {
    name: 'building-content',
    components: {
        Editor
    }
};
</script>

<style scoped lang="scss">
.building-content {
    background-color: #eee;
    position: relative;
}

.building-content-inner {
    padding: 20px 60px;
}

</style>
