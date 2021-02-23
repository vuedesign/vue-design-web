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
        <!-- {{ profile }} -->
        <div v-if="profile" class="profile">
            <span class="profile-name">{{ profile.nickname || profile.username }}</span>
             <a-popover placement="bottomRight" trigger="click">
                <template #content>
                    <div class="popover-profile-content">
                        <dl class="popover-profile-avatar">
                            <dt>
                                <a-avatar
                                    :size="48"
                                    :src="profile.avatar"
                                />
                            </dt>
                            <dd>
                                <h5 class="popover-profile-username">
                                    <span>{{ profile.username }}</span>
                                </h5>
                                <p class="popover-profile-rule">{{ rule[profile.rule] }}</p>
                            </dd>
                        </dl>
                        <dl>
                            <dt>昵称：</dt>
                            <dd>{{ profile.nickname }}</dd>
                        </dl>
                        <dl>
                            <dt>邮件：</dt>
                            <dd>{{ profile.email }}</dd>
                        </dl>
                        <dl>
                            <dt>电话：</dt>
                            <dd>{{ profile.phone }}</dd>
                        </dl>
                        <div class="popover-profile-logout">
                            <a-button
                                type="dashed"
                                block
                                @click="handleLogout"
                            >退出登录</a-button>
                        </div>
                    </div>
                </template>
                <!-- <template #title>
                    <span>Title</span>
                </template> -->
                <a-avatar
                    class="profile-avatar"
                    :src="profile.avatar"
                />
            </a-popover>
        </div>
    </a-layout-header>
</template>

<script>
import { computed, readonly, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { message } from 'ant-design-vue';
import { useStore } from 'vuex';
import { MENU_LIST, RULE } from '../constants';

export default {
    name: 'vd-header',
    setup() {
        const route = useRoute();
        const store = useStore();
        const router = useRouter();
        const currentNavName = ref(route.name);

        const menuList = readonly(MENU_LIST);
        const rule = readonly(RULE);

        store.dispatch('globals/findProfile');

        const profile = computed(() => store.getters['globals/profile']);

        const handleCheck = ({ value }) => {
            currentNavName.value = value;
            router.push({
                name: value
            });
        };

        const handleLogout = () => {
            message.info('点击了退出登录按钮');
        };

        return {
            currentNavName,
            menuList,
            rule,
            handleCheck,
            profile,
            handleLogout
        };
    }
};
</script>

<style scoped lang="scss">
    .vd-header {
        display: flex;
        width: 100%;
        max-width: 1300px;
        margin: 0 auto;
        height: auto;
        background-color: transparent;
        padding: 0 50px;
        padding-top: 16px;
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

    .profile {
        display: flex;
        padding: 4px 0;
        .profile-name {
            height: 40px;
            line-height: 40px;
            padding: 0 8px;
        }
        .profile-avatar {
            display: block;
            width: 40px;
            height: 40px;
            border: 4px solid #fff;
            border-radius: 20px;
            background-color: #ffffff;
            cursor: pointer;
        }
    }

    .popover-profile-content {
        width: 220px;
        dl,
        dt,
        dd {
            margin-bottom: 0;
        }
        dl {
            margin-bottom: 8px;
            display: flex;
        }
        dt {
            color: #999;
            font-weight: 400;
        }
        dd {
            color: #333;
        }
    }

    .popover-profile-avatar {
        border-bottom: 1px solid #eee;
        padding-bottom: 12px;
    }

    .popover-profile-username {
        font-size: 16px;
        color: #333;
        line-height: 24px;
        margin-left: 12px;
        margin-bottom: 0;
        margin-top: 2px;
    }

    .popover-profile-rule {
        font-size: 12px;
        color: #666;
        margin-left: 12px;
        margin-bottom: 0;
    }

    .popover-profile-logout {
        border-top: 1px solid #eee;
        padding-top: 12px;
    }

    .logout-notification {
        z-index: 1040;
    }
</style>
