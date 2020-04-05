/**
 * Created by wujian on 2018/3/18.
 */

export default {
    namespaced: true,
    state: {
        list: [],
        detail: {},
        selectIcon: ''
    },
    getters: {
        list: state => state.list,
        detail: state => state.detail
    },
    mutations: {
    }
};
