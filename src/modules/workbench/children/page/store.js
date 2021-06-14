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
    menuList: [],
    pageDetail: {}
};

const mutations = {
    MENU_LIST(state, menuList) {
        state.menuList = menuList;
    },
    UPDATE_DETAIL(state, { data, type }) {
        if (type === 'category') {
            const index = state.menuList.findIndex(item => item.id === data.id);
            state.menuList[index] = data;
        } else {
            state.menuList.forEach(item => {
                if (item.pages && item.pages.length) {
                    const pageIndex = item.pages.findIndex(i => i.id === data.id);
                    if (pageIndex > -1) {
                        item.pages[pageIndex] = data;
                    }
                }
            });
        }
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
            if (item.pages && item.pages.length) {
                item.pages = item.pages.map(i => {
                    i.isEdit = false;
                    return i;
                });
            }
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
    menuList: state => state.menuList,
    pageDetail: state => state.pageDetail,
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
};
