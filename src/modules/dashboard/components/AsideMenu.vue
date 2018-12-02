<template>
    <div class="dashboard-aside-menu">
        <dl>
            <dt>项目名称:</dt>
            <dd>vued-gui</dd>
        </dl>
        <dl>
            <dt>项目版本:</dt>
            <dd>1.0.0</dd>
        </dl>
        <dl>
            <dt>项目作者:</dt>
            <dd>n.see</dd>
        </dl>
        <dl>
            <dt>项目描述:</dt>
            <dd>A Vue.js project</dd>
        </dl>
    </div>
</template>

<script>

export default {
    name: 'dashboard-aside-menu',
    data() {
        return {};
    }
};
</script>

<style lang="scss">
    .dashboard-aside-menu{
        height: 100%;
        float: left;
        width: 320px;
        border-right: 1px solid #eef5f9;
        background-color: #eef5f9;
        padding: 0 10px;
        dl {
            padding: 8px 0;
            line-height: 1.5em;
            &:after {
                content: '';
                display: block;
                clear: both;
                width: 100%;
                height: 0;
            }
            > dt {
                float: left;
                color: #666;
                margin-right: 5px;
            }
            > dd{
                overflow: hidden;
                color: #333;
            }
        }
    }
</style>
