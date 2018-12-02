export default [
    {
        path: 'folder',
        name: 'generator-folder',
        meta: {
            label: '模块组列表'
        },
        component: () => import('./Index')
    },
    {
        path: 'folder/add',
        name: 'generator-folder-add',
        meta: {
            label: '新增模块组'
        },
        component: () => import('./Add'),
        children: [
            {
                path: 'icon',
                name: 'generator-folder-add-icon',
                meta: {
                    label: '图标列表'
                },
                component: () => import('../components/IconList')
            }
        ]
    }
];
