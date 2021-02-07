<template>
    <div class="auth">
        <header class="header-auth">
            <h1>VUE.design</h1>
        </header>
        <router-view />
    </div>
</template>

<script>

export default {
    name: 'auth'
};
</script>

<style lang="scss" scope>
    .auth{
        width: 100%;
        height: 100%;
        display: flex;
        background-color: #eef5f9;
        flex-direction: column;
    }
    .header-auth {
        max-width: 1200px;
        min-width: 800px;
        margin: 0 auto;

        h1 {
            color: #fff;
            text-shadow: 0 1px 2px rgba(0, 0, 0, .1);
        }
    }
</style>
