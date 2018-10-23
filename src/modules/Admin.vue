<template>
    <vued-t-shape>
        <vued-header slot="header"></vued-header>
        <vued-aside slot="aside"></vued-aside>
        <div slot="body">
            <router-view/>
        </div>
    </vued-t-shape>
</template>

<script>
import VuedTShape from '@/components/layouts/VuedTShape';
import VuedAside from '@/components/servers/VuedAside';
import VuedHeader from '@/components/servers/VuedHeader';
export default {
    name: 'admin',
    components: {
        VuedTShape,
        VuedAside,
        VuedHeader
    },
    data() {
        return {
            msg: 'Welcome to Your Vue.js App'
        };
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
