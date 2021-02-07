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
        detail: state => state.detail,
        list: state => {
            console.log('state', state);
            return [
                {
                    id: 1,
                    name: 'projectName',
                    description: '项目名称'
                },
                {
                    id: 2,
                    name: 'projectName',
                    description: '项目名称'
                },
                {
                    id: 3,
                    name: 'projectName',
                    description: '项目名称'
                },
                {
                    id: 4,
                    name: 'projectName',
                    description: '项目名称'
                }
            ];
        }
    }
};
