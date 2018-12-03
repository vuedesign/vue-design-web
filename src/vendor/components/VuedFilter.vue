<template>
    <div class="vued-filter">
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: 'vued-filter'
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .vued-filter{
        margin-bottom: 20px;
        background-color: #eef5f97a;
        padding: 0 8px 8px 8px;
        &:after{
            content: '';
            display: block;
            width: 100%;
            height: 0;
            clear: both;
        }
        ul{
            li{
                float: left;
                margin-left: 8px;
                &:first-child{
                    margin-left: 0;
                }
                margin-top: 8px;
            }
            &.left{
                float: left;
            }
            &.right{
                float: right;
            }
        }
    }
</style>
