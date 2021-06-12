import {
    findData,
    findOneData,
    updateFieldData,
    createData,
    updateData,
    destroyData
} from './api';

const state = {
    detail: {
        id: null,
        name: '',
        description: '',
        thumb: ''
    },
    list: [],
    filter: {
        page: 1,
        size: 7,
        order: 'updatedAt DESC',
        tagId: 0
    },
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
    },
    FILTER(state, filter) {
        Object.assign(state.filter, filter);
    },
    UPDATE_ACTIVCE_STATE(state, { id, active }) {
        state.list.forEach(item => {
            if (item.id === id) {
                item.active = active;
            } else {
                item.active = false;
            }
        });
        console.log('state.list', state.list);
    }
};

const actions = {
    find: async({ commit, getters }, query) => {
        commit('FILTER', query);
        const res = await findData(getters.filter);
        const list = res.list.map(item => {
            return {
                ...item,
                active: false
            };
        });
        console.log('res', res, list);
        commit('LIST', list);
        commit('TOTAL', res.total);
    },
    findOne: async({ commit }, id) => {
        const res = await findOneData(id);
        commit('DETAIL', res);
    },
    updateField: async({ dispatch }, { id, field, value, type }) => {
        const res = await updateFieldData(id, {
            field,
            value,
            type
        });
        await dispatch('find');
        console.log('res', res);
    },
    create: ({ dispatch }, data = {}) => {
        return createData(data).then(res => {
            dispatch('find');
            return res;
        });
    },
    update: ({ dispatch }, data = {}) => {
        return updateData(data).then(res => {
            dispatch('find');
            return res;
        });
    },
    destroy: ({ dispatch }, id) => {
        return destroyData(id).then(res => {
            dispatch('find');
            return res;
        });
    }
};

const getters = {
    detail: state => state.detail,
    list: state => state.list,
    total: state => state.total,
    filter: state => state.filter
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
};
