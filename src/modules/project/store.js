/**
 * Created by wujian on 2018/3/18.
 */
import * as apis from './apis';

const state = {
    filter: {},
    list: [],
    detail: {},
    total: 0,
    selectIcon: ''
};

const actions = {
    find: async({ commit, getters }) => {
        const res = await apis.findData(getters.filter);
        commit('LIST', res.rows);
        commit('TOTAL', res.count);
        console.log('project find:', res);
    }
}

const mutations = {
    LIST(state, payload) {
        state.list = payload;
    },
    FILTER(state, payload) {
        state.filter = payload;
    },
    TOTAL(state, payload) {
        state.total = payload;
    },
    DETAIL(state, payload) {
        state.detail = payload;
    }
};

const getters = {
    list: state => state.list,
    detail: state => state.detail,
    filter: state => state.filter,
    total: state => state.total
};

export default {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
};
