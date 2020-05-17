<template>
    <div class="design-module">
        <design-panel-bar />
        <design-panel-main>
            module
        </design-panel-main>
    </div>
</template>

<script>
import DesignPanelBar from '@modules/design/components/DesignPanelBar';
import DesignPanelMain from '@modules/design/components/DesignPanelMain';

export default {
    name: 'design-module',
    components: {
        DesignPanelBar,
        DesignPanelMain
    },
    data() {
        return {
        };
    }
};
</script>

<style lang="scss" scope>
    .design-module{
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
    }
</style>
