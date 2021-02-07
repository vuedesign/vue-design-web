<template>
    <div class="design">
        <design-header />
        <div class="design-body">
            <div class="design-left">
                <design-plugin />
            </div>
            <div class="design-main">
                <!--<design-component />-->
            </div>
            <div class="design-right">
                <!--<design-component />-->
            </div>
        </div>
    </div>
</template>

<script>
import DesignPlugin from '../children/plugin/pages/Index';
import DesignHeader from '../components/DesignHeader';

export default {
    name: 'project',
    components: {
        DesignHeader,
        DesignPlugin
    },
    data() {
        return {
        };
    }
};
</script>

<style lang="scss" scope>
    $border-color: #9dcdff;
    .design{
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        background-color: #eef5f9;
    }

    .design-body {
        display: flex;
        flex: 1;
    }

    .design-left {
        width: 280px;
        border-right: 1px solid $border-color;
    }

    .design-main {
        flex: 1;
    }

    .design-right {
        width: 280px;
        border-left: 1px solid $border-color;
    }
</style>
