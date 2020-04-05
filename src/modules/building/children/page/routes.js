export default [
    {
        path: 'pages/:page',
        name: 'generator-pages',
        meta: {
            label: '页面'
        },
        component: () => import('./pages/Index'),
        children: [
            {
                path: 'add',
                name: 'generator-pages-add',
                meta: {
                    label: '新增页面'
                },
                component: () => import('./pages/Add')
            },
            {
                path: 'edit/:id',
                name: 'generator-pages-edit',
                meta: {
                    label: '编辑页面'
                },
                component: () => import('./pages/Edit')
            },
            {
                path: 'view/:id',
                name: 'generator-pages-view',
                meta: {
                    label: '编辑页面'
                },
                component: () => import('./pages/View')
            }
        ]
    }
];
