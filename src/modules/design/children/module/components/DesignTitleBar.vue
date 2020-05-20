<template>
    <header class="design-title-bar">
        <dl>
            <slot name="title" v-if="this.$slots.title" />
            <dt v-else>{{ title }}</dt>
            <slot />
        </dl>
    </header>
</template>

<script>
// import { mapGetters } from 'vuex';

export default {
    name: 'design-title-bar',
    props: {
        title: {
            type: String,
            default: ''
        }
    },
    data() {
        console.log('slots', this.$slots);
        return {};
    }
};
</script>

<style lang="scss" scope>
    .design-title-bar {
        height: 40px;
        line-height: 40px;
        padding: 0 8px;
        width: 100%;
        background-color: #eef5f9;

        dl {
            display: flex;
        }

        dt {
            flex: 1;
            font-size: 14px;
        }

        dd {
            min-width: 40px;
            text-align: center;
            cursor: pointer;
            i,
            span {
                display: inline-block;
                vertical-align: middle;
            }
            i {
                color: #999;
            }
            span {
                font-size: 14px;
            }
        }
    }
</style>
