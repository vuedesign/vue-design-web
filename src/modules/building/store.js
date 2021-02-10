import component from './children/component/store';
import icon from './children/icon/store';
import material from './children/material/store';
import page from './children/page/store';
import editor from './children/editor/store';
import config from './children/config/store';

const state = {
    currentToolBar: 'component',
    componentTree: [
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
    ],
    currentPageOptions: {
        props: {
            style: {
                display: 'flex',
                backgroundColor: 'transparent',
                width: '100%',
                height: '100%'
            }
        }
    }
};

const mutations = {
    UPDATE_CURRENT_TOOL_BAR(state, payload) {
        state.currentToolBar = payload;
    },
    UPDATE_CURRENT_PAGE_STYLE(state, style) {
        Object.assign(state.currentPageOptions.props.style, style);
    }
};

const actions = {};

const getters = {
    currentToolBar: state => state.currentToolBar,
    componentTree: state => state.componentTree,
    currentPageStyle: state => state.currentPageOptions.props.style,
    currentPageOptions: state => state.currentPageOptions
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
    modules: {
        component,
        icon,
        material,
        page,
        editor,
        config
    }
};
