import { findData, findOneData } from './api';

const state = {
    detail: {
        id: 0,
        name: '',
        description: ''
    },
    list: [],
    total: 0
};

const mutations = {
    LIST(state, list) {
        state.list = list;
    },
    TOTAL(state, total) {
        state.total = total;
    },
    DETAIL(state, detail) {
        state.detail = detail;
    }
};

const actions = {
    find: async({ commit }) => {
        const res = await findData();
        console.log('res', res);
        commit('LIST', res.list);
        commit('TOTAL', res.total);
    },
    findOne: async({ commit }, id) => {
        const res = await findOneData(id);
        commit('DETAIL', res);
    }
};

const getters = {
    detail: state => state.detail,
    list: state => state.list,
    total: state => state.total
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
};
