export default [
    {
        path: 'pages/:page',
        name: 'generator-pages',
        meta: {
            label: '页面'
        },
        component: () => import('./Index'),
        children: [
            {
                path: 'add',
                name: 'generator-pages-add',
                meta: {
                    label: '新增页面'
                },
                component: () => import('./Add')
            },
            {
                path: 'edit/:id',
                name: 'generator-pages-edit',
                meta: {
                    label: '编辑页面'
                },
                component: () => import('./Edit')
            },
            {
                path: 'view/:id',
                name: 'generator-pages-view',
                meta: {
                    label: '编辑页面'
                },
                component: () => import('./View')
            }
        ]
    }
];
