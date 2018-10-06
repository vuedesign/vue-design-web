export default {
    data() {
        return {
            mixin: 'mixin'
        };
    },
    mounted() {
        this.mixinTest();
    },
    methods: {
        mixinTest() {
            console.log('====', this.mixin);
        }
    }
};
