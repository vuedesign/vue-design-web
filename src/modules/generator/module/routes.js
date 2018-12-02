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
        path: 'module/add',
        name: 'generator-module-add',
        meta: {
            label: '新增模块'
        },
        component: () => import('./Add'),
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
    }
];
