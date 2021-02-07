import page from './children/component/store';
import api from './children/api/store';

export default {
    namespaced: true,
    state: {
        currentToolBar: 'component',
        list: [],
        uuidList: []
    },
    mutations: {
        UPDATE_CURRENT_TOOL_BAR(state, payload) {
            state.currentToolBar = payload;
        },
        LIST(state, payload) {
            state.list = payload;
        },
        UUID_LIST(state, payload) {
            state.uuidList = payload;
        }
    },
    actions: {},
    getters: {
        currentToolBar: state => state.currentToolBar,
        list: state => state.list,
        uuidList: state => state.uuidList,
    },
    modules: {
        page,
        api
    }
};
