<template>
    <div class="auth">
        <div class="authWr">
            <h1>Football planner</h1>
            <div>
                <a @click="clickLoginLink" :class="loginLinkClass" href="#">Логин</a>
                <a @click="clickRegistrationLink" :class="regLinkClass" href="#">Регистрация</a>
            </div>
            <div class="inputWr">
                <form
                    v-if="isLogin"
                    action=""
                    method="post"
                    @submit.prevent="loginHandler"
                >
                    <Input ref="userEmail" placeholder="Email" type="email" label="Email" v-model="email"/>
                    <Input placeholder="Password" type="password" label="Password" v-model="password"/>
                    <Button :disabled="isDisabled" type="submit" class="authButton loginButton" text="Log In" viewType="positive"/>
                </form>
                <form
                    v-else
                    action=""
                    method="post"
                    @submit.prevent="registrationHandler"
                >
                    <Input ref="userEmail" placeholder="Email" type="email" label="Email" v-model="email"/>
                    <Input placeholder="Name" type="text" label="Name" v-model="name"/>
                    <Input placeholder="Password" type="password" label="Password" v-model="password"/>
                    <Button :disabled="isDisabled" type="submit" class="authButton regButton" text="Registration" viewType="positive"/>
                </form>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import {Action} from 'vuex-class';

import Input from '@/components/reusableComponents/input/Input.vue';
import Button from '@/components/reusableComponents/button/Button.vue';

const namespace: string = 'auth';

@Component({
    components: {
        Input,
        Button,
    },
})
export default class Auth extends Vue {
    private email: string = '';
    private name: string = '';
    private password: string = '';
    private isLogin: boolean = true;

    @Action('loginUser', { namespace })
    private loginUser!: any;
    @Action('registrationUser', { namespace })
    private registrationUser!: any;

    get loginLinkClass(): object {
        return {
            loginLink: true,
            active: this.isLogin,
        };
    }

    get regLinkClass(): object {
        return {
            active: !this.isLogin,
        };
    }

    get isDisabled(): boolean {
        return this.isEmailInvalid || this.isPasswordInvalid;
    }

    get isEmailInvalid(): boolean {
        const email = this.$refs.userEmail as Vue;
        const isEmailInvalid = !!email && !(email.$el.children[1] as HTMLInputElement).validity.valid;

        return this.email.trim().length === 0 || isEmailInvalid;
    }

    get isPasswordInvalid(): boolean {
        const passwordLength = this.password.trim().length;
        return passwordLength === 0 || passwordLength < 6;
    }

    protected loginHandler(): void {
        const { email, password } = this;
        if (this.isDisabled) return;
        this.loginUser({ email, password });
    }

    protected registrationHandler(): void {
        const { email, password, name } = this;
        if (this.isDisabled || !name) return;
        this.registrationUser({ email, password, name });
    }

    protected clickLoginLink(event: any): void {
        event.preventDefault();

        this.isLogin = true;
    }

    protected clickRegistrationLink(event: any): void {
        event.preventDefault();

        this.isLogin = false;
    }
}
</script>

<style scoped lang="scss">
    .auth {
        display: flex;
        height: 100%;
        align-items: center;
    }

    .authWr {
        margin: 0 auto;

        .inputWr {
            margin-top: 40px;

            .authButton {
                margin-top: 10px;
            }
        }

        a {
            text-decoration: none;
            color: black;
        }

        a.active {
            border-bottom: 2px solid black;
        }

        .loginLink {
            margin-right: 20px;
        }
    }
</style>
