<template>
    <div class="auth">
        <header class="header-auth">
            <h1>vue-design</h1>
        </header>
        <router-view />
    </div>
</template>

<script>

export default {
    name: 'auth'
};
</script>

<style lang="scss">
    .auth{
        width: 100%;
        height: 100%;
        display: flex;
        background-color: #eef5f9;
        flex-direction: column;
    }
</style>
