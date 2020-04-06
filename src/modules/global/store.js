import * as types from './types';
import * as apis from './apis';
import asideMenu from '@/configs/asideMenu';

const state = {
    breadcrumbs: [],
    asideMenu: [],
    permission: [],
    actions: [],
    asideActive: '',
    token: '',
    userinfo: {
        id: '',
        username: '',
        nickname: ''
    }
};

const actions = {
    findMenu: ({ commit }) => {
        return new Promise((resolve) => {
            commit(types.ASIDE_MENU, asideMenu);
            resolve();
        });
    },
    userinfo: async({ commit }) => {
        const res = await apis.userinfoData();
        console.log('res----------------', res);
        commit('USERINFO', res);
    }
};

const mutations = {
    [types.BREADCRUMB](state, to) {
        const { matched } = to;
        let breadcrumbs = [];
        matched.forEach((item) => {
            breadcrumbs.push({
                name: item.name,
                label: item.meta.label
            });
        });
        state.breadcrumbs = breadcrumbs;
    },
    [types.ASIDE_MENU](state, asideMenu) {
        state.asideMenu = asideMenu;
    },
    [types.PERMISSION](state, permission) {
        state.permission = permission;
    },
    [types.ACTIONS](state, actions) {
        state.actions = actions;
    },
    [types.ASIDE_ACTIVE](state, asideActive) {
        state.asideActive = asideActive;
    },
    [types.TOKEN](state, token) {
        state.token = token;
        localStorage.setItem(types.VUE_DESIGN_TOKEN, token);
    },
    [types.USERINFO](state, userinfo){
        state.userinfo = userinfo;
    }
};

const getters = {
    userinfo: state => state.userinfo,
    token: state => {
        if (state.token) {
            return state.token;
        } else {
            const token = localStorage.getItem(types.VUE_DESIGN_TOKEN);
            if (token) {
                return token;
            }
            return '';
        }
    },
    breadcrumbs: state => state.breadcrumbs,
    menu: state => state.menu,
    asideMenu: state => state.asideMenu,
    headerMenuActive: state => state.headerMenuActive,
    actions: state => state.actions,
    asideActive: state => state.asideActive
};

export default {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
};
