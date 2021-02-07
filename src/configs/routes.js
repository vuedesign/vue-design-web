import project from '@modules/project/routes';
import team from '@modules/team/routes';
import template from '@modules/template/routes';
import building from '@modules/building/routes';
import demo from '@modules/demo/routes';
import globals from '@modules/globals/routes';

export default [
    {
        path: '/',
        name: 'contaniner',
        redirect: {
            name: 'project'
        },
        component: () => import(`@modules/globals/components/DbContainer`),
        children: [
            ...project,
            ...template,
            ...team,
            ...demo,
        ]
    },
    building,
    ...globals
];
