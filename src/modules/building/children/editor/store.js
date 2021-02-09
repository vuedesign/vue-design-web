const state = {
    position: {
        tx: 50,
        ty: 8,
        scale: 1,
        width: 800,
        height: 500
    },
    pageName: '页面1',
    currentComponent: {
        options: [
            {
                id: 1,
                tag: 'a-layout',
                props: {},
                children: [
                    {
                        id: 12,
                        tag: 'a-layout-header',
                        props: {},
                        children: 'Header'
                    },
                    {
                        id: 13,
                        tag: 'a-layout-content',
                        props: {},
                        children: [
                            {
                                id: 131,
                                tag: 'div',
                                props: {},
                                children: 'Content'
                            },
                            {
                                id: 132,
                                tag: 'a-button',
                                props: {
                                    type: 'primary'
                                },
                                children: 'Primary'
                            }
                        ]
                    },
                    {
                        id: 14,
                        tag: 'a-layout-header',
                        props: {},
                        children: 'footer'
                    }
                ]
            }
        ]
    }
};

const mutations = {
    POSITION(state, position) {
        Object.assign(state.position, position);
    }
};

const actions = {};

const getters = {
    position: state => state.position,
    pageName: state => state.pageName,
    currentComponentOptions: state => state.currentComponent.options
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
};
