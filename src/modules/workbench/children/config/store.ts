const state = {
    currentTab: 'configPage'
};

const mutations = {
    UPDATE_CURRENT_CONFIG(state, currentTab) {
        state.currentTab = currentTab;
    }
};

const actions = {};

const getters = {
    currentTab: state => state.currentTab
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
};
