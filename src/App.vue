<template>
  <div id="vue-design-app">
    <router-view/>
  </div>
</template>

<script>
export default {
    name: 'App',
    created() {
        // cookie
        this.$cookies.set('TEST_COOKIE_1', {
            username: 'wujian====',
            age: 18
        });
        console.log('cookie = ', this.$cookies.get('TEST_COOKIE_1'), this.$cookies.getJSON('TEST_COOKIE'));
    }
};
</script>

<style>
@import "assets/styles/app.scss";
</style>
