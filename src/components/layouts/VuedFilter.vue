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
