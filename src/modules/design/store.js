/**
 * Created by wujian on 2018/3/18.
 */

import module from './children/module/store';

const state = {
    selectIcon: ''
};

const getters = {
    selectIcon: state => state.selectIcon
};

const mutations = {
    SELECT_ICON(state, selectIcon) {
        state.selectIcon = selectIcon;
    }
};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    modules: {
        module
    }
};
