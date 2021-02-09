import { readonly } from 'vue';

export const MENU_LIST = readonly([
    {
        value: 'page',
        label: '页面',
    },
    {
        value: 'api',
        label: '接口',
    },
    {
        value: 'template',
        label: '模版',
    },
    {
        value: 'config',
        label: '配置',
    },
    {
        value: 'deploy',
        label: '部署',
    },
]);

export const TOOL_BAR_LIST = readonly([
    {
        label: '组件',
        icon: 'icon-module',
        value: 'component'
    },
    {
        label: '图标',
        icon: 'icon-server',
        value: 'icon'
    },
    {
        label: '素材',
        icon: 'icon-picture',
        value: 'material'
    },
    {
        label: '页面',
        icon: 'icon-doc',
        value: 'page'
    }
]);
