import { readonly } from 'vue';

export const TOOL_TREE = readonly([
    {
        name: 'HomeOutlined',
        label: 'HomeOutlined',
        icon: 'HomeOutlined'
    },
    {
        name: 'SettingFilled',
        label: 'SettingFilled',
        icon: 'SettingFilled',
    },
    {
        name: 'SyncOutlined',
        label: 'SyncOutlined',
        icon: 'SyncOutlined',
        props: { spin: true }
    },
    {
        name: 'SmileOutlined',
        label: 'SmileOutlined',
        icon: 'SmileOutlined',
        props: { rotate: 180 }
    },
    {
        name: 'LoadingOutlined',
        label: 'LoadingOutlined',
        icon: 'LoadingOutlined'
    }
]);
