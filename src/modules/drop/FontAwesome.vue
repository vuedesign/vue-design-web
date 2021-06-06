<template>
    <i class="font-awesome fas" :class="classNames" :style="styles"></i>
</template>

<script>
import { defineComponent } from 'vue';
// https://fontawesome.com/v5.15/icons?d=gallery&p=2&m=free

export default defineComponent({
    name: 'font-awesome',
    props: {
        name: {
            type: String,
            default: 'angry'
        },
        size: {
            type: String,
            default: '14px'
        },
        color: {
            type: String,
            default: '#666'
        }
    },
    computed: {
        classNames() {
            return `fa-${this.name}`;
        },
        styles() {
            return {
                fontSize: this.size,
                color: this.color
            };
        }
    }
});
</script>

<style lang="scss" scoped>
.font-awesome {
    position: relative;
}
</style>
