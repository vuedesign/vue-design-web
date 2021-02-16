import component from './children/component/store';
import icon from './children/icon/store';
import material from './children/material/store';
import page from './children/page/store';
import editor from './children/editor/store';
import config from './children/config/store';
// import { getItem } from '@core/localStore';

const state = {
    currentToolBar: 'component',
    componentTree: [
        // {
        //     id: 1,
        //     tag: 'a-layout',
        //     props: {},
        //     children: [
        //         {
        //             id: 12,
        //             tag: 'a-layout-header',
        //             props: {},
        //             children: 'Header'
        //         },
        //         {
        //             id: 13,
        //             tag: 'a-layout-content',
        //             props: {},
        //             children: [
        //                 {
        //                     id: 131,
        //                     tag: 'div',
        //                     props: {},
        //                     children: 'Content'
        //                 },
        //                 {
        //                     id: 132,
        //                     tag: 'a-button',
        //                     props: {
        //                         type: 'primary'
        //                     },
        //                     children: 'Primary'
        //                 }
        //             ]
        //         },
        //         {
        //             id: 14,
        //             tag: 'a-layout-header',
        //             props: {},
        //             children: 'footer'
        //         }
        //     ]
        // }
    ],
    currentPageOptions: {
        customState: {
            size: 'default',
            position: 'default'
        },
        props: {
            style: {
                display: 'flex',
                flexDirection: 'row',
                backgroundColor: 'transparent',
                width: '100%',
                height: '100%',
                left: 0,
                top: 0
            }
        }
    },
    currentUuid: ''
};

function componentTreePush(state, uuid, options) {
    console.log('options', options);
    if (state.componentTree.length <= 0) {
        return;
    }
    const index = state.componentTree.findIndex(item => item.uuid === uuid);
    if (index > -1) {
        if (!Array.isArray(state.componentTree[index].children)) {
            state.componentTree[index].children = [];
        }
        state.componentTree[index].children.push(options);
    } else {
        state.componentTree.forEach(item => {
            componentTreePush(item.children, uuid, options);
        });
    }
}

const mutations = {
    UPDATE_CURRENT_TOOL_BAR(state, payload) {
        state.currentToolBar = payload;
    },
    UPDATE_CURRENT_PAGE_STYLE(state, style) {
        Object.assign(state.currentPageOptions.props.style, style);
    },
    UPDATE_CURRENT_PAGE_CUSTOM_STATE(state, customState) {
        Object.assign(state.currentPageOptions.customState, customState);
    },
    ADD_COMPONENT(state, { uuid, options }) {
        if (uuid) {
            componentTreePush(state, uuid, options);
        } else {
            state.componentTree.push(options);
        }
        console.log('state.componentTree', state.componentTree);
    },
    UPDATE_CURRENT_UUID(state, currentUuid) {
        state.currentUuid = currentUuid;
    }
};

const actions = {};

const getters = {
    currentToolBar: state => state.currentToolBar,
    componentTree: state => state.componentTree,
    currentPageCustomState: state => state.currentPageOptions.customState,
    currentPageStyle: state => state.currentPageOptions.props.style,
    currentPageOptions: state => state.currentPageOptions,
    currentUuid: state => state.currentUuid
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
