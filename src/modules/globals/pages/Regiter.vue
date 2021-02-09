<template>
    <a-layout-content class="page-regiter">
        <div class="page-regiter-inner">
            <div class="page-regiter-left"></div>
            <div class="page-regiter-right">
                <div class="page-regiter-right-inner">
                    <a-divider orientation="left">注册</a-divider>
                    <a-form
                        layout="horizontal"
                        :model="formData"
                        @submit="handleRegiter"
                        @submit.native.prevent
                    >
                        <a-form-item
                            class="login-item"
                        >
                            <a-input
                                v-model:value="formData.account"
                                placeholder="用户名/手机号/邮箱"
                            >
                                <template #prefix><UserOutlined style="color:rgba(0,0,0,.25)"/></template>
                            </a-input>
                        </a-form-item>
                        <a-form-item
                            class="login-item"
                        >
                            <a-input
                                v-model:value="formData.password"
                                type="password"
                                placeholder="密码">
                                <template #prefix><LockOutlined style="color:rgba(0,0,0,.25)"/></template>
                            </a-input>
                        </a-form-item>
                        <a-form-item class="login-item">
                            <a-button
                                block
                                type="primary"
                                html-type="submit"
                                :disabled="formData.account === '' || formData.password === ''"
                            >注 册</a-button>
                            <a-button
                                block
                                type="link"
                                @click="handleGotoLogin"
                            >登 录</a-button>
                        </a-form-item>
                    </a-form>
                </div>
            </div>
        </div>
    </a-layout-content>
</template>
<script>
import { reactive } from 'vue';
import { useStore } from 'vuex';
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue';
import { useRouter } from 'vue-router';

export default {
    name: 'db-project',
    components: {
        UserOutlined,
        LockOutlined
    },
    setup() {
        const store = useStore();
        const router = useRouter();

        const formData = reactive({
            account: '18602042482',
            password: 'string'
        });

        const handleRegiter = () => {
            store.dispatch('globals/regiter', formData);
        };

        const handleGotoLogin = () => {
            router.push({
                name: 'login'
            });
        };

        return {
            formData,
            handleRegiter,
            handleGotoLogin
        };
    }
};
</script>

<style scoped lang="scss">
.page-regiter {
    padding: 100px;
}

.page-regiter-inner {
    width: 800px;
    margin: 0 auto;
    display: flex;
    min-height: 300px;;
}

.page-regiter-left {
    flex: 1;
}
.page-regiter-right {
    width: 300px;
}

.page-regiter-right-inner {
    border: 1px solid #eee;
    height: 100%;
    padding: 20px 40px 0 40px;
}

</style>
<style lang="scss">
.page-regiter {
    .login-item {
        > div {
            width: 100%;
        }
    }
}
</style>
