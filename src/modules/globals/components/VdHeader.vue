<template>
    <a-layout-header class="vd-header">
        <div class="logo">
            <span>VUE.Design</span>
        </div>
        <nav class="nav">
            <ul>
                <li
                    v-for="item in menuList"
                    :key="item.value"
                    :class="{ 'active': currentNavName === item.value }"
                    @click="handleCheck(item)"
                >
                    <span>{{ item.label }}</span>
                </li>
            </ul>
        </nav>
        <div v-if="profile" class="avatar">
            <a-avatar
                class="avatar-inner"
                :src="profile.avatar"
            />
        </div>
    </a-layout-header>
</template>

<script>
import { computed, readonly, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { MENU_LIST } from '../constants';

export default {
    name: 'vd-header',
    setup() {
        const route = useRoute();
        const store = useStore();
        const router = useRouter();
        const currentNavName = ref(route.name);

        const menuList = readonly(MENU_LIST);

        store.dispatch('globals/findProfile');

        const profile = computed(() => store.getters['globals/profile']);

        const handleCheck = ({ value }) => {
            currentNavName.value = value;
            router.push({
                name: value
            });
        };

        return {
            currentNavName,
            menuList,
            handleCheck,
            profile
        };
    }
};
</script>

<style scoped lang="scss">
    .vd-header {
        display: flex;
        width: 1200px;
        margin: 0 auto;
        height: auto;
        background-color: transparent;
        padding: 0;
        padding-top: 24px;
        justify-content: space-between;
    }
    .logo {
        height: 48px;
        line-height: 48px;
        padding-right: 20px;

        span {
            font-size: 16px;
            font-weight: 700;
        }
    }

    .nav {
        flex: 1;

        ul {
            display: flex;
            margin: 0;
            min-height: 0;
        }

        li {
            font-size: 16px;
            color: #999999;
            padding: 0 20px;
            position: relative;
            height: 48px;
            line-height: 48px;
            cursor: pointer;

            &::after {
                content: '';
                display: block;
                position: absolute;
                width: 6px;
                height: 6px;
                border-radius: 6px;
                border: 1px solid #ddd;
                bottom: 4px;
                left: 50%;
                transform: translateX(-3px);
            }

            &.active {
                color: #333333;

                &::after {
                    border-color: #013255;
                    background-color: #999999;
                }
            }

            &:hover {
                color: #333333;

                &::after {
                    background-color: #999999;
                }
            }
        }
    }

    .avatar {
        .avatar-inner {
            display: block;
            width: 48px;
            height: 48px;
            border: 1px solid #aaa;
            border-radius: 24px;
            background-color: #ffffff;
        }
    }
</style>
