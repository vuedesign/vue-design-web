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
        icon: 'build-outlined',
        value: 'component'
    },
    {
        label: '图标',
        icon: 'smile-outlined',
        value: 'icon'
    },
    {
        label: '素材',
        icon: 'picture-outlined',
        value: 'material'
    },
    {
        label: '页面',
        icon: 'file-text-outlined',
        value: 'page'
    }
]);
