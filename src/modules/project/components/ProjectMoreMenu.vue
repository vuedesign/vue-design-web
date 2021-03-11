<template>
    <a-sub-menu
        v-if="menuItem.children && menuItem.children.length"
        popup-class-name="class-sub-menu"
    >
        <template #title>
            <component :is="menuItem.icon" />
            {{ menuItem.label }}
        </template>
        <project-more-menu
            v-for="item in menuItem.children"
            :key="item.value"
            :menu-item="item"
        />
    </a-sub-menu>
    <a-menu-divider v-else-if="menuItem.label === 'divider'" />
    <a-menu-item
        v-else
        :key="menuItem.value"
        :title="menuItem.label"
    >
        <component :is="menuItem.icon" />
        {{ menuItem.label }}
    </a-menu-item>
</template>

<script>
import { defineComponent } from 'vue';
import {
    FormOutlined,
    DeleteOutlined,
    CopyOutlined,
    TagsOutlined,
    SettingOutlined,
    TagOutlined
} from '@ant-design/icons-vue';

export default defineComponent({
    name: 'project-more-menu',
    components: {
        FormOutlined,
        DeleteOutlined,
        CopyOutlined,
        TagsOutlined,
        SettingOutlined,
        TagOutlined
    },
    props: {
        menuItem: {
            type: Object,
            default: () => ({})
        }
    }
});
</script>

<style>
.class-sub-menu {
    min-width: 120px;
}
</style>
