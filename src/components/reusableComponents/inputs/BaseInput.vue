<template>
    <input
        :class="[ 'baseInput', viewType, { invalid : isInvalid } ]"
        :value="value"
        :min="min"
        :max="max"
        :checked="value"
        :placeholder="placeholder"
        :type="type"
        @input="handleInput"
        @change="handleInput"
    />
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class BaseInput extends Vue {
    @Prop({ default: '' }) private viewType!: string;
    @Prop({ default: '' }) private value!: string | number | boolean;
    @Prop() private placeholder!: string;
    @Prop() private type!: string;
    @Prop() private input!: () => void;
    @Prop() private filter!: (value: string) => void;
    @Prop({ default: -99999 }) private min!: number;
    @Prop({ default: 99999 }) private max!: number;
    @Prop({ default: false }) private isInvalid!: boolean;

    protected handleInput(event: any): void {
        const { value } = event.target;
        const { type, filter } = this;
        let filteredValue = filter ? filter(value) : value;

        if (filteredValue !== value) event.currentTarget.value = value;
        if (type === 'checkbox' || type === 'radio') filteredValue = event.target.checked;
        this.$emit('input', filteredValue);
    }
}
</script>

<style scoped>
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
        padding: 9px 14px;
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

    .small {
        padding: 4px 7px;
    }

    .invalid {
        border-color: red;
        z-index: 1;
    }
</style>
