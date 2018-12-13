export default [
    {
        path: 'module',
        name: 'generator-module',
        meta: {
            label: '模块列表'
        },
        component: () => import('./Index')
    },
    {
        path: 'module/add-base',
        name: 'generator-module-add-base',
        meta: {
            label: '新增模块基础信息'
        },
        component: () => import('./AddBase'),
        children: [
            {
                path: 'icon',
                name: 'generator-module-add-icon',
                meta: {
                    label: '图标列表'
                },
                component: () => import('../components/IconList')
            }
        ]
    },
    {
        path: 'module/add-table',
        name: 'generator-module-add-table',
        meta: {
            label: '新增模块表格数据'
        },
        component: () => import('./AddTable')
    },
    {
        path: 'module/add-data',
        name: 'generator-module-add-data',
        meta: {
            label: '新增模块数据配置'
        },
        component: () => import('./AddData'),
        children: [
            {
                path: 'add',
                name: 'generator-module-add-data-add',
                meta: {
                    label: '新增数据'
                },
                component: () => import('./TableAdd')
            },
            {
                path: 'edit/:id',
                name: 'generator-module-add-data-edit',
                meta: {
                    label: '编辑数据'
                },
                component: () => import('./TableAdd')
            }
        ]
    }
];
