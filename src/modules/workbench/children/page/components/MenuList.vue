<template>
    <ul class="menu-list">
        <li
            v-for="item in menuList"
            :key="item.id"
            :class="{ 'active': item.id === currentSelectMenuId }"
            @click="handleSelect(item)"
        >
            <div class="category-item">
                <div v-if="item.isEdit" class="title">
                    <input
                        :value="item.name"
                        @input="(evt) => handleInput(evt, item)"
                        @blur="handleBlur(item)"
                    />
                </div>
                <div v-else class="title">
                    <FolderOpenOutlined v-if="type === 'category'" />
                    <FileTextOutlined v-else />
                    <span @dblclick="handleEdit(item)">{{ item.name }}</span>
                </div>
                <div class="icon" @click="handleDelete(item)">
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
            <!-- <ul v-if="item.pages && item.pages.length">
                <li
                    v-for="page in item.pages"
                    :key="page.id"
                >
                    <div>
                        <span>{{ page.name }}</span>
                    </div>
                </li>
            </ul> -->
        </li>
    </ul>
</template>

<script>
import { defineComponent } from 'vue';
import {
    // FolderAddOutlined,
    // PlusSquareOutlined,
    DeleteOutlined,
    FolderOpenOutlined,
    FileTextOutlined
} from '@ant-design/icons-vue';

export default defineComponent({
    name: 'menu-list',
    components: {
        // FolderAddOutlined,
        // PlusSquareOutlined,
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
            type: Number,
            default: 0
        },
        type: {
            type: String,
            default: 'category'
        }
    },
    emits: ['select', 'input', 'blur', 'edit', 'del'],
    setup(props, { emit }) {
        const handleSelect = (item) => {
            emit('select', item);
        };

        const handleInput = (evt, item) => {
            emit('input', evt, item);
        };

        const handleBlur = (item) => {
            emit('blur', item);
        };

        const handleEdit = (item) => {
            emit('edit', item);
        };

        const handleDelete = (item) => {
            emit('del', item);
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
            // > .category-item {
            //     background-color: #ffd8f8;
            // }
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
            padding-left: 20px;
        }
    }
}
</style>
