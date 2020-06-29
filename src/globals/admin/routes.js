export default [
    {
        path: '/',
        name: 'admin',
        meta: {
            label: '项目'
        },
        redirect: {
            name: 'project'
        },
        component: () => import('./pages/Index'),
        children: []
    }
];
