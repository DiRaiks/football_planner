<template>
    <button :class="buttonClass" @click="handlerClick">{{text}}</button>
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
        const { viewType, disabled } = this;

        return {
            [`button-${ viewType }`]: viewType,
            buttonDisabled: disabled,
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
    button {
        border-radius: 10px;
        position: relative;
        display: inline-block;
        margin: 0;
        padding: 10px 20px;
        line-height: 20px;
        font-size: 15px;
        font-weight: 500;
        color: #000000;
        transition: background-color .1s;
        white-space: nowrap;
        background: #EEEEEE;
        border: none;
        cursor: pointer;

        &:hover {
            background: #d1d1d1;
        }

        &.button-positive {
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
    }
</style>
