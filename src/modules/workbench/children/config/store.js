const state = {
    currentConfigComponentName: 'config-page',
    currentComponentConfig: {}
};

const mutations = {
    UPDATE_CURRENT_CONFIG(state, currentConfigComponentName) {
        state.currentConfigComponentName = currentConfigComponentName;
    },
    UPDATE_CURRENT_COMPONENT_CONFIG(state, currentComponentConfig) {
        state.currentComponentConfig = currentComponentConfig;
    }
};

const actions = {};

const getters = {
    currentConfigComponentName: state => state.currentConfigComponentName,
    currentComponentConfig: state => state.currentComponentConfig
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
};
