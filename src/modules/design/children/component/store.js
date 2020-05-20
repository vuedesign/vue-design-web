/**
 * Created by wujian on 2018/3/18.
 */

export default {
    namespaced: true,
    state: {
        selectIcon: ''
    },
    getters: {
        selectIcon: state => state.selectIcon
    },
    mutations: {
        SELECT_ICON(state, selectIcon) {
            state.selectIcon = selectIcon;
        }
    },
    modules: {
    }
};
