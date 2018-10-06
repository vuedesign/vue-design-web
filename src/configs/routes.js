import defaultRoutes from '@/configs/defaultRoutes';
import adminRoutes from '@/configs/adminRoutes';

export default [
    {
        path: '/',
        name: 'HelloWorld',
        component: () => import('@/components/Home')
    },
    {
        path: '/admin',
        name: 'admin',
        component: () => import('@/modules/Admin'),
        children: adminRoutes
    },
    ...defaultRoutes,
    {
        path: '*',
        redirect: '/error'
    }
];
