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
    @Prop({ default: '' }) private value!: string | number;
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

    private handleInput(event: any): void {
        const { value } = event.target;
        const filteredValue = this.filter ? this.filter(value) : value;

        if (filteredValue !== value) event.currentTarget.value = value;
        this.$emit('input', filteredValue);
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
    .input-default {
        padding: 9px 14px;
    }
    .input-small {
        padding: 4px 7px;
    }
</style>
