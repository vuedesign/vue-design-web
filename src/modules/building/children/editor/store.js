const state = {
    position: {
        tx: 50,
        ty: 8,
        scale: 1,
        width: 800,
        height: 500
    },
    pageName: '页面1',
    contextMenu: {
        style: {
            left: 0,
            top: 0,
            display: 'none'
        },
        uuid: null
    }
};

const mutations = {
    POSITION(state, position) {
        Object.assign(state.position, position);
    },
    UPDATE_CONTEXT_MENU_STYLE(state, contextMenuStyle) {
        Object.assign(state.contextMenu.style, contextMenuStyle);
    },
    UPDATE_CONTEXT_MENU_UUID(state, contextMenuUuid) {
        state.contextMenu.uuid = contextMenuUuid;
    }
};

const actions = {};

const getters = {
    position: state => state.position,
    pageName: state => state.pageName,
    contextMenuStyle: state => state.contextMenu.style,
    contextMenuUuid: state => state.contextMenu.uuid
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
};
