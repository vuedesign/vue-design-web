<template>
    <dl class="design-module-item">
        <dt>
            <span class="design-module-item-icon"><vue-design-iconfont type="folder-open" /></span>
            <span class="design-module-item-name">{{ item.description }}</span>
        </dt>
        <dd>
            <template v-if="item.children && item.children.length">
                <list-item
                    v-for="citem in item.children"
                    :item="citem"
                    :key="citem.uuid"
                />
            </template>
        </dd>
    </dl>
</template>

<script>

export default {
    name: 'list-item',
    props: {
        item: {
            type: Object,
            default: () => ({})
        }
    }
};
</script>

<style lang="scss" scope>
    .design-module-item{
        background-color: transparent;
        dl {
            margin-left: 20px;
        }
        dt {
            line-height: 16px;
            padding: 4px 0;
            span {
                display: inline-block;
                height: 18px;
                line-height: 18px;
            }
        }
    }
    .design-module-item-icon {
        margin-right: 2px;
        width: 18px;
        color: #409EFF;
    }
</style>
