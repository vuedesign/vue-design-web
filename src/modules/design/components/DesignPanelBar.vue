<template>
    <header class="design-panel-bar">
        <dl>
            <dt>{{ title }}</dt>
            <slot />
        </dl>
    </header>
</template>

<script>
// import { mapGetters } from 'vuex';

export default {
    name: 'design-panel-bar',
    props: {
        title: {
            type: String,
            default: ''
        }
    },
    data() {
        return {};
    }
};
</script>

<style lang="scss" scope>
    .design-panel-bar {
        height: 28px;
        width: 100%;
        background-color: rgba($color: #fff, $alpha: .5);

        dl {
            display: flex;
        }

        dt {
            flex: 1;
        }

        dd {
            width: 28px;
        }
    }
</style>
