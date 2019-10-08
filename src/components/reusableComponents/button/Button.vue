<template>
    <button :class="buttonClass" @click="$emit('onClick')">{{text}}</button>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Button extends Vue {
    @Prop() private text!: string;
    @Prop() private onClick!: () => void;
    @Prop({ default: '' }) private viewType!: string;

    get buttonClass(): object {
        const { viewType } = this;

        return {
            [`button-${ viewType }`]: viewType,
        };
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
    }
</style>
