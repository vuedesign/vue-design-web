<template>
    <div class="design-component-list">
        <dl>
            <dt>xxxx</dt>
            <dd>aabbb</dd>
        </dl>
    </div>
</template>

<script>

export default {
    name: 'design-component-list',
    props: {
        visible: {
            type: Boolean
        }
    },
    data() {
        return {
            dialogVisible: false
        };
    }
};
</script>

<style lang="scss" scope>
    .design-component-list{
        height: 100%;
        padding: 10px 16px;
        background-color: #f9f9f9;
    }
</style>
