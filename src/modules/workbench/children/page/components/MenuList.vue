<template>
    <ul class="menu-list">
        <li
            v-for="item in menuList"
            :key="item.id"
            :class="{ 'active': `${type}-${item.id}` === currentSelectMenuId }"
            @click.stop="handleSelect(item, type)"
        >
            <div class="category-item">
                <div v-if="item.isEdit" class="title">
                    <input
                        :value="item.name"
                        @input="(evt) => handleInput(evt, item, type)"
                        @blur="handleBlur(item, type)"
                    />
                </div>
                <div v-else class="title">
                    <FolderOpenOutlined v-if="type === 'category'" />
                    <FileTextOutlined v-else />
                    <span @dblclick.stop="handleEdit(item, type)">{{ item.name }}</span>
                </div>
                <div class="icon" @click="handleDelete(item, type)">
                    <DeleteOutlined />
                </div>
            </div>
            <menu-list
                v-if="item.pages && item.pages.length"
                :menu-list="item.pages"
                :current-select-menu-id="currentSelectMenuId"
                type="page"
                @select="handleSelect"
                @input="handleInput"
                @blur="handleBlur"
                @edit="handleEdit"
                @del="handleDelete"
            />
        </li>
    </ul>
</template>

<script>
import { defineComponent } from 'vue';
import {
    DeleteOutlined,
    FolderOpenOutlined,
    FileTextOutlined
} from '@ant-design/icons-vue';

export default defineComponent({
    name: 'menu-list',
    components: {
        DeleteOutlined,
        FolderOpenOutlined,
        FileTextOutlined
    },
    props: {
        menuList: {
            type: Array,
            default: () => []
        },
        currentSelectMenuId: {
            type: String,
            default: ''
        },
        type: {
            type: String,
            default: 'category'
        }
    },
    emits: ['select', 'input', 'blur', 'edit', 'del'],
    setup(props, { emit }) {
        const handleSelect = (item, type) => {
            // debugger;
            emit('select', item, type);
        };

        const handleInput = (evt, item, type) => {
            emit('input', evt, item, type);
        };

        const handleBlur = (item, type) => {
            emit('blur', item, type);
        };

        const handleEdit = (item, type) => {
            emit('edit', item, type);
        };

        const handleDelete = (item, type) => {
            emit('del', item, type);
        };

        return {
            handleSelect,
            handleInput,
            handleBlur,
            handleEdit,
            handleDelete
        };
    }
});
</script>

<style lang="scss" scoped>
.menu-list {
    li {
        line-height: 28px;

        > .category-item {
            width: 100%;
            padding: 0 10px;
            display: flex;
            position: relative;
            z-index: 2;
            cursor: pointer;

            > .title {
                flex: 1;
                span {
                    margin-left: 5px;
                }
            }

            > .icon {
                display: flex;
                justify-content: center;
                align-items: center;
                color: #999;

                &:hover {
                    color: #FD00DB;
                    cursor: pointer;
                }
            }
        }

        &.active {
            position: relative;
            &::after {
                content: '';
                display: block;
                background-color: #ffd8f8;
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 28px;
                z-index: 1;
            }
        }

        input {
            line-height: 20px;
            height: 20px;
            border: none;
            background-color: #fff;
            outline: none;
            padding: 0 5px;
        }

        > ul {
            .category-item {
                padding-left: 28px;
            }
        }
    }
}
</style>
