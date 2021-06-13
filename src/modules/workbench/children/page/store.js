import {
    findData,
    createData,
    updateData,
    destroyData,
    findCategoryData,
    createCategoryData,
    updateCategoryData,
    destroyCategoryData
} from './api';

const state = {
    meunList: [],
    pageDetail: {}
};

const mutations = {
    MENU_LIST(state, meunList) {
        state.meunList = meunList;
    },
    UPDATE_DETAIL(state, data) {
        const index = state.findCategory.findIndex(item => item.id === data.id);
        state.findCategory[index] = data;
    },
    PAGE_DETAIL(state, pageDetail) {
        state.pageDetail = pageDetail;
    }
};

const actions = {
    find: async({ commit }, params) => {
        const res = await findData(params);
        const list = res.map(item => {
            item.isEdit = false;
            return item;
        });
        commit('LIST', list);
        console.log('res find', res);
    },
    create: async({ dispatch, rootGetters }, data) => {
        const res = await createData(data);
        const projectDetail = rootGetters['project/detail'];
        console.log('res create', res);
        dispatch('findCategory', {
            projectId: projectDetail.id
        });
    },
    update: async({ dispatch, rootGetters }, data) => {
        const res = await updateData(data);
        const projectDetail = rootGetters['project/detail'];
        console.log('res update', res);
        dispatch('findCategory', {
            projectId: projectDetail.id
        });
    },
    destroy: async({ dispatch, rootGetters }, id) => {
        const res = await destroyData(id);
        const projectDetail = rootGetters['project/detail'];
        console.log('res destroy', res);
        dispatch('findCategory', {
            projectId: projectDetail.id
        });
    },
    // 分类
    findCategory: async({ commit }, params) => {
        const res = await findCategoryData(params);
        const list = res.map(item => {
            item.isEdit = false;
            return item;
        });
        commit('MENU_LIST', list);
        console.log('res find', res);
    },
    createCategory: async({ dispatch, rootGetters }, data) => {
        const res = await createCategoryData(data);
        const projectDetail = rootGetters['project/detail'];
        console.log('res create', res);
        dispatch('findCategory', {
            projectId: projectDetail.id
        });
    },
    updateCategory: async({ dispatch, rootGetters }, data) => {
        const res = await updateCategoryData(data);
        const projectDetail = rootGetters['project/detail'];
        console.log('res update', res);
        dispatch('findCategory', {
            projectId: projectDetail.id
        });
    },
    destroyCategory: async({ dispatch, rootGetters }, id) => {
        const res = await destroyCategoryData(id);
        const projectDetail = rootGetters['project/detail'];
        console.log('res destroy', res);
        dispatch('findCategory', {
            projectId: projectDetail.id
        });
    }
};

const getters = {
    meunList: state => state.meunList,
    pageDetail: state => state.pageDetail,
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
};
