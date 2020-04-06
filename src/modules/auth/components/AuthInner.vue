<template>
    <div class="auth-inner">
        <div class="auth-main">
            <div class="auth-inner-left"></div>
            <div class="auth-inner-right">
                <div class="auth-inner-right-inner">
                    <el-divider content-position="left">{{ title }}</el-divider>
                    <slot />
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: 'auth-inner',
    props: {
        title: {
            type: String,
            default: ''
        }
    }
};
</script>

<style lang="scss">
    .auth-inner{
        width: 100%;
        height: auto;
    }
    .auth-main {
        max-width: 1200px;
        min-width: 800px;
        margin: 0 auto;
        display: flex;
    }
    .auth-inner-left {
        flex: 1;
        min-height: 400px;
    }
    .auth-inner-right {
        width: 400px;
    }
    .auth-inner-right-inner {
        width: 100%;
        background-color: #fff;
        box-shadow: 0 0 3px rgba(255, 255, 255, .2);
        padding: 30px 50px;
    }
</style>
