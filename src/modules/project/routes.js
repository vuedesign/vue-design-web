/**
 * Created by wujian on 2018/3/18.
 */

export default {
    path: 'project',
    name: 'project',
    meta: { label: '项目' },
    component: () => import('./pages/Index'),
    redirect: { name: 'project-list' },
    children: [
        {
            path: 'list',
            name: 'project-list',
            meta: {
                label: '项目列表'
            },
            component: () => import('./pages/List')
        },
        {
            path: 'add',
            name: 'project-add',
            meta: {
                label: '新建项目'
            },
            component: () => import('./pages/Add')
        },
        {
            path: 'edit',
            name: 'project-edit',
            meta: {
                label: '修改项目'
            },
            component: () => import('./pages/Edit')
        }
    ]
};
