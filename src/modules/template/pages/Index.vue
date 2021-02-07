<template>
    <a-layout-content style="padding: 0 50px">
        template
    </a-layout-content>
</template>
<script>
const data = [
    {
        title: 'Title 1',
    },
    {
        title: 'Title 2',
    },
    {
        title: 'Title 3',
    },
    {
        title: 'Title 4'
    }
];

export default {
    name: 'db-template',
    setup() {
        return {
            data
        };
    }
};
</script>
