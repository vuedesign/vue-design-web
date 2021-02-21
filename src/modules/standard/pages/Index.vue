<template>
    <a-layout-content class="page-standard">
        standard
    </a-layout-content>
</template>
<script>
import { computed } from 'vue';
import { useStore } from 'vuex';

export default {
    name: 'db-standard',
    components: {},
    setup() {
        const store = useStore();

        const list = computed(() => store.getters['standard/list']);

        return {
            list
        };
    }
};
</script>

<style scoped lang="scss">
.page-standard {
    width: 1200px;
    margin: 0 auto;
    min-height: calc(100% - 158px);
}

.list-nav {
    padding-top: 40px;

    ul {
        display: flex;
    }

    li {
        margin-right: 20px;

        span {
            padding-left: 5px;
        }
    }
}

.list-content {
    width:  100%;
    ul {
        margin: 0 -8px;
        &::after {
            content: '';
            display: block;
            clear: both;
            width: 100%;
        }
    }

    li {
        padding: 8px;
        width: 25%;
        float: left;

        .item {
            width: 100%;
            padding-top: percentage(170/288);
            background-color: #fff;
            position: relative;
            height: 0;

            &:hover {
                background-color: #F2F2F2;

                .item-inner {
                    display: flex;
                }

                .item-more {
                    display: block;
                }
            }
        }

        .item-inner {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            justify-content: center;
            align-items: center;
            display: none;

            &.btn-add {
                cursor: pointer;

                span {
                    color: #999;
                }
                i {
                    color: #ddd;
                }
            }
        }

        .item-more {
            display: none;
            position: absolute;
            top: 10px;
            right: 10px;
            width: 20px;
            height: 20px;
            text-align: center;
            cursor: pointer;
        }

        .title {
            height: 36px;
            line-height: 36px;
        }
    }
}
</style>

<style>
.class-sub-menu {
    width: 100px;
}
</style>
