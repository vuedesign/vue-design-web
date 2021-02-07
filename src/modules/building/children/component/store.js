export default {
    namespaced: true,
    state: {
        detail: {
            id: 1,
            name: 'projectName',
            description: '项目名称'
        }
    },
    mutations: {},
    actions: {},
    getters: {
        detail: state => state.detail
    }
};
