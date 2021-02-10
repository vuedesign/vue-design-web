const state = {
    position: {
        tx: 50,
        ty: 8,
        scale: 1,
        width: 800,
        height: 500
    },
    pageName: '页面1'
};

const mutations = {
    POSITION(state, position) {
        Object.assign(state.position, position);
    }
};

const actions = {};

const getters = {
    position: state => state.position,
    pageName: state => state.pageName
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
};
