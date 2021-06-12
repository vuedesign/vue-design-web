import project from '@/modules/project/routes';
import team from '@/modules/team/routes';
import standard from '@/modules/standard/routes';
import template from '@/modules/template/routes';
import workbench from '@/modules/workbench/routes';
import demo from '@/modules/demo/routes';
import globals from '@/modules/globals/routes';

export default [
    {
        path: '/',
        name: 'contaniner',
        redirect: {
            name: 'project'
        },
        component: () => import(`../modules/globals/components/VdContainer.vue`),
        children: [
            ...project,
            ...template,
            ...team,
            ...standard,
            ...demo,
        ]
    },
    workbench,
    ...globals
];
