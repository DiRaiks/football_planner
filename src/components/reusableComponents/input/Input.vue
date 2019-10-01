<template>
    <label :for="currentId">
        <span >{{label}}</span>
        <input
                :class="inputClass"
                :id="currentId"
                :type="type"
                :placeholder="placeholder"
                :min="min"
                :max="max"
                :value="value"
                :checked="value"
                @input="handleInput"
                @change="handleInput"
        >
    </label>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Input extends Vue {
    @Prop({ default: 'default' }) private viewType!: string;
    @Prop({ default: '' }) private value!: string | number | boolean;
    @Prop() private label!: string;
    @Prop() private placeholder!: string;
    @Prop() private type!: string;
    @Prop() private input!: () => void;
    @Prop() private filter!: (value: string) => void;
    @Prop({ default: -99999 }) private min!: number;
    @Prop({ default: 99999 }) private max!: number;

    get inputClass(): object {
        const { viewType } = this;

        return {
            [`input-${ viewType }`]: viewType,
        };
    }
    get currentId(): string {
        return this.label + this.type;
    }

    protected handleInput(event: any): void {
        const { value } = event.target;
        let filteredValue = this.filter ? this.filter(value) : value;

        if (filteredValue !== value) event.currentTarget.value = value;
        if (this.type === 'checkbox' || this.type === 'radio') filteredValue = event.target.checked;
        this.$emit('input', filteredValue);
    }
}
</script>

<style scoped lang="scss">
    label {
        display: flex;
        justify-content: space-between;
        padding: 15px 20px;
        align-items: center;
    }

    span {
        margin-right: 20px;
    }

    input {
        margin: 0;
        vertical-align: top;
        background: white;
        font-size: 14px;
        color: #000000;
        line-height: 20px;
        border-radius: 6px;
        border: 1px solid black;
        box-shadow: none;
        outline: none;
        position: relative;
        appearance: none;
    }

    input[type="checkbox" i] {
        background-color: initial;
        cursor: default;
        -webkit-appearance: checkbox;
        box-sizing: border-box;
        margin: 3px 0.5ex;
        padding: initial;
        border: initial;
    }

    .input-default {
        padding: 9px 14px;
    }

    .input-small {
        padding: 4px 7px;
    }
</style>
