<template>
    <nav class="tool-bar">
        <ul>
            <li
                v-for="item in tooBarList"
                :key="item.value"
                :class="{ 'active': currentToolBar === item.value }"
                @click="handleTooBarClick(item)"
            >
                <iconfont :type="item.icon" />
            </li>
        </ul>
    </nav>
</template>

<script>
import { TOOL_BAR_LIST } from '../contants';
import { useCurrentToolBar } from '../services/toolBar';

export default {
    name: 'tool-bar',
    setup() {

        const { currentToolBar, updateCurrentToolBar } = useCurrentToolBar();

        const handleTooBarClick = (item) => {
            updateCurrentToolBar(item.value);
        };

        return {
            currentToolBar,
            handleTooBarClick,
            tooBarList: TOOL_BAR_LIST
        };
    }
};
</script>

<style lang="scss" scoped>
.tool-bar {
    position: fixed;
    top: 53px;
    left: 246px;

    ul {
        background-color: #fff;
        width: 36px;
        border: 1px solid #d6dfe7;
        border-radius: 18px;
        padding: 8px 0;
    }

    li {
        text-align: center;
        padding: 5px 0;
        cursor: pointer;

        &.active,
        &:hover {
            ::v-deep(.anticon) {
                color: #FD00DB;
            }
        }
    }

    li ::v-deep(.anticon) {
        font-size: 16px;
        color: #397097;
    }
}
</style>
