// import Vue from 'vue';
// import { router, store } from '@/vued';
import * as types from './types';
import { list2tree } from '@/vendors/utils';
import asideMenu from '@/configs/asideMenu';

const state = {
    breadcrumbs: [],
    asideMenu: [],
    permission: [],
    actions: [],
    asideActive: ''
};

const actions = {
    findMenu: ({ commit }) => {
        return new Promise((resolve) => {
            commit(types.ASIDE_MENU, asideMenu);
            resolve();
        });
    },
    permission: ({ commit }) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                const data = require('@/configs/permission.json');
                // commit('PERMISSION', data);
                const menuData = list2tree(data);
                console.log('menuData', menuData);
                commit(types.ASIDE_MENU, menuData);
                resolve();
            }, 100);
        });
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
    }
};

const getters = {
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
