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
                    class="loginForm"
                    action=""
                    method="post"
                    @submit.prevent="loginHandler"
                >
                    <div class="formGroup">
                        <IconInput
                            class="userEmail"
                            ref="userEmail"
                            placeholder="Email"
                            type="email"
                            v-model="email"
                            @focus="clearError"
                            :key="'loginEmail'"
                        >
                            <div class="peopleIcon"/>
                        </IconInput>
                        <transition name="bubbleAnimation">
                            <div v-if="!isPasswordError && errorKey" class="bubbleWr errorTip">{{ error }}</div>
                        </transition>
                    </div>
                    <div class="formGroup">
                        <IconInput
                            class="userPassword"
                            placeholder="Password"
                            type="password"
                            label="Password"
                            v-model="password"
                            @focus="clearError"
                            :key="'loginPassword'"
                        >
                            <div class="lockIcon"/>
                        </IconInput>
                        <transition name="bubbleAnimation">
                            <div v-if="isPasswordError && errorKey" class="bubbleWr errorTip">{{ error }}</div>
                        </transition>
                    </div>
                    <Button :disabled="isDisabled" type="submit" class="authButton loginButton" text="Sign In" viewType="positive"/>
                </form>
                <form
                    v-else
                    action=""
                    method="post"
                    @submit.prevent="registrationHandler"
                >
                    <div class="formGroup">
                        <IconInput
                            ref="userEmail"
                            placeholder="Email"
                            type="email"
                            label="Email"
                            v-model="email"
                            @focus="clearError"
                            :key="'regEmail'"
                        >
                            <div class="peopleIcon"/>
                        </IconInput>
                        <transition name="bubbleAnimation">
                            <div v-if="errorKey" class="bubbleWr errorTip">{{ error }}</div>
                        </transition>
                    </div>
                    <div class="formGroup">
                        <IconInput
                            placeholder="Name"
                            type="text"
                            label="Name"
                            v-model="name"
                            :key="'regPassword'"
                        >
                            <div class="peopleIcon"/>
                        </IconInput>
                    </div>
                    <div class="formGroup">
                        <IconInput
                            placeholder="Password"
                            type="password"
                            label="Password"
                            v-model="password"
                        >
                            <div class="lockIcon"/>
                        </IconInput>
                    </div>
                    <Button :disabled="isDisabled" type="submit" class="authButton regButton" text="Registration" viewType="positive"/>
                </form>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Action, Getter } from 'vuex-class';

import LabelInput from '@/components/reusableComponents/inputs/LabelInput.vue';
import IconInput from '@/components/reusableComponents/inputs/IconInput.vue';
import Button from '@/components/reusableComponents/button/Button.vue';

const namespace: string = 'auth';

@Component({
    components: {
        LabelInput,
        IconInput,
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
    @Action('setError', { namespace: 'errors' })
    private setError!: any;
    @Getter('getErrorName', { namespace: 'errors' })
    private errorKey!: string;

    get loginLinkClass(): object { return { loginLink: true, active: this.isLogin }; }
    get regLinkClass(): object { return { active: !this.isLogin }; }
    get isDisabled(): boolean { return this.isEmailInvalid || this.isPasswordInvalid; }
    get isEmailInvalid(): boolean {
        const email = this.$refs.userEmail as Vue;
        const isEmailInvalid = !!email && !(email.$el.children[1] as HTMLInputElement).validity.valid;

        return this.email.trim().length === 0 || isEmailInvalid;
    }
    get isPasswordInvalid(): boolean {
        const passwordLength = this.password.trim().length;
        return passwordLength === 0 || passwordLength < 6;
    }
    get error(): string {
        if (this.errorKey === 'WRONG_PASSWORD') return 'Неверный пароль';
        if (this.errorKey === 'WRONG_EMAIL') return 'Пользователь не найден';
        if (this.errorKey === 'EMAIL_ALREADY_EXISTS') return 'Такой пользователь уже есть';
        return 'Ошибка авторизации';
    }
    get isPasswordError(): boolean { return this.errorKey === 'WRONG_PASSWORD'; }

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

        this.clearError();
        this.clearFields();
        this.isLogin = true;
    }
    protected clickRegistrationLink(event: any): void {
        event.preventDefault();

        this.clearError();
        this.clearFields();
        this.isLogin = false;
    }
    protected clearError(): void {
        if (this.errorKey) this.setError({ errorPayload: '', errorName: '' });
    }
    protected clearFields(): void {
        this.email = '';
        this.name = '';
        this.password = '';
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

            .loginForm {
                max-width: 250px;
            }

            .peopleIcon {
                width: 16px;
                height: 16px;
                background-size: 16px 16px;
                background-image: url('../../../assets/user-solid_auth.svg');
            }

            .lockIcon {
                width: 16px;
                height: 16px;
                background-size: 16px 16px;
                background-image: url('../../../assets/open-lock.svg');
            }

            .authButton {
                color: white;
            }

            .formGroup {
                position: relative;
                margin-bottom: 15px;

                .errorTip {
                    z-index: 2;
                    position: absolute;
                    bottom: 48px;
                    background: #F05333;
                    border-radius: 6px;

                    &:before {
                        content: '';
                        position: absolute;
                        bottom: -7px;
                        left: 22px;
                        margin-left: -7px;
                        border-left: 7px solid transparent;
                        border-right: 7px solid transparent;
                        border-top: 7px solid #F05333;
                    }

                    &.bubbleWr {
                        color: white;
                        padding: 10px 20px;
                        font-size: 15px;
                        line-height: 20px;
                        border-radius: 6px;
                        display: block;
                        max-width: 300px;
                        box-sizing: border-box;

                        @media (max-width: 475px) {
                            font-size: 13px;
                            line-height: 16px;
                            padding: 8px 15px;
                        }
                    }
                }
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

    .bubbleAnimation {
        &-enter-active,
        &-leave-active {
            transition: transform .1s ease, opacity .1s ease;
        }

        &-enter,
        &-leave-to {
            transform: translate(0, 5px);
            opacity: 0;
        }

        &-enter.bubbleFromTopDir,
        &-leave-to.bubbleFromTopDir {
            transform: translate(0, -5px);
        }

        &-enter.bubbleLeft,
        &-leave-to.bubbleLeft {
            transform: translate(5px, 0);
        }
    }
</style>
