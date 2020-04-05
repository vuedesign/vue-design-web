export default [
    {
        path: 'folder',
        name: 'generator-folder',
        meta: {
            label: '模块组列表'
        },
        component: () => import('./pages/Index')
    },
    {
        path: 'folder/add',
        name: 'generator-folder-add',
        meta: {
            label: '新增模块组'
        },
        component: () => import('./pages/Add'),
        children: [
            {
                path: 'icon',
                name: 'generator-folder-add-icon',
                meta: {
                    label: '图标列表'
                },
                component: () => import('@/modules/project/components/IconList')
            }
        ]
    }
];
