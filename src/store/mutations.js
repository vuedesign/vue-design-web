import {
    BREADCRUMB,
    MENU,
    ASIDE_MENU,
    HEADER_MENU,
    HEADER_MENU_ACTIVE
} from './types';

export default {
    [BREADCRUMB](state, to) {
        const { matched } = to;
        let breadcrumbs = [];
        matched.forEach((item, index) => {
            breadcrumbs.push({
                name: item.name,
                label: item.meta.label
            });
        });
        state.breadcrumbs = breadcrumbs;
    },
    [MENU](state, menu) {
        state.menu = menu;
    },
    [ASIDE_MENU](state, asideMenu) {
        state.asideMenu = asideMenu;
    },
    [HEADER_MENU](state, headerMenu) {
        state.headerMenu = headerMenu;
    },
    [HEADER_MENU_ACTIVE](state, headerMenuActive) {
        state.headerMenuActive = headerMenuActive;
    }
};
