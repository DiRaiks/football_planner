<template>
    <button :class="buttonClass" @click="handlerClick">
        {{text}}
        <div class="buttonSpinner"></div>
    </button>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Button extends Vue {
    @Prop() private text!: string;
    @Prop() private onClick!: () => void;
    @Prop({ default: '' }) private viewType!: string;
    @Prop({ default: false }) private disabled!: boolean;
    @Prop({ default: false }) private isPending!: boolean;

    get buttonClass(): object {
        const { viewType, disabled, isPending } = this;

        return {
            [`${ viewType }Button`]: viewType,
            buttonDisabled: disabled,
            buttonPending: isPending,
        };
    }

    protected handlerClick(event: any): void {
        if (this.disabled || this.isPending) {
            return;
        } else {
            this.$emit('onClick');
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

    @keyframes buttonSpinner {
        0% {
            transform: rotate(0);
            animation-timing-function: cubic-bezier(.55,.055,.675,.19);
        }
        50% {
            transform: rotate(180deg);
            animation-timing-function: cubic-bezier(.215,.61,.355,1);
        }
        100% {
            transform: rotate(360deg);
        }
    }

    button {
        position: relative;
        border-radius: 10px;
        position: relative;
        display: inline-block;
        margin: 0;
        padding: 10px 25px;
        line-height: 20px;
        font-size: 15px;
        font-weight: 500;
        color: #000000;
        transition: background-color .1s;
        white-space: nowrap;
        background: #EEEEEE;
        border: none;
        cursor: pointer;
        transition: all ease-in 0.05s;

        &:hover {
            background: #d1d1d1;
        }

        &.positiveButton {
            background: aquamarine;

            &:hover {
                background: #5dbea3;
            }
        }

        &.buttonDisabled {
            background: #9c9c9c;

            &:hover {
                background: #9c9c9c;
                cursor: not-allowed;
            }
        }

        &.buttonPending {
            padding: 10px 35px 10px 15px;
            transition: all ease-in 0.15s;
            background: #d1d1d1;
            cursor: default;

            .buttonSpinner {
                opacity: 1;
                transition: all ease-in 0.1s;
            }
        }

        .buttonSpinner {
            width: 20px;
            height: 20px;
            opacity: 0;
            position: absolute;
            top: calc(50% - 10px);
            right: 10px;
            background-image: url('../../../assets/button-spinner.svg');

            animation: buttonSpinner 1.5s linear infinite;
        }
    }
</style>
