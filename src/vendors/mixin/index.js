import { mapGetters } from 'vuex';

export default {
    computed: {
        ...mapGetters('global', ['token']),
        globalHeaders() {
            return {
                authorization: `Bearer ${this.token}`,
                'X-Requested-With': 'XMLHttpRequest'
            };
        }
    }
};
