export default [
    {
        path: '/',
        name: 'admin',
        meta: {
            label: '首页'
        },
        redirect: {
            name: 'project'
        },
        component: () => import('./pages/Index'),
        children: []
    }
];
