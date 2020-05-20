<template>
    <div class="design-module-list">
        <dl>
            <dt>xxxx</dt>
            <dd>aabbb</dd>
        </dl>
    </div>
</template>

<script>

export default {
    name: 'design-module-list',
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
    .design-module-list{
        height: 100%;
        padding: 10px 16px;
        background-color: #f9f9f9;
    }
</style>
