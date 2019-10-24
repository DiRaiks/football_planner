<template>
    <label :for="currentId" class="inp">
        <input
            :type="type"
            :id="currentId"
            placeholder=" "
            :min="min"
            :max="max"
            :value="value"
            @input="handleInput"
            @change="handleInput"
        >
        <span class="label">{{ label }}</span>
    </label>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class StyleInput extends Vue {
    @Prop({ default: '' }) private value!: string | number | boolean;
    @Prop({ default: '' }) private label!: string;
    @Prop() private type!: string;
    @Prop() private input!: () => void;
    @Prop() private filter!: (value: string) => void;
    @Prop({ default: -99999 }) private min!: number;
    @Prop({ default: 99999 }) private max!: number;
    @Prop({ default: '' }) private id!: string;

    get currentId(): string {
        const { label, type, id } = this;
        return `${ label }_${ type }_${ id }`;
    }

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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .inp {
        position: relative;
        margin: auto;
        /*width: 100%;*/
        max-width: 280px;
    }

    .label {
        position: absolute;
        top: -2px;
        left:5px;
        font-size: 16px;
        color: #9098A9;
        font-weight: 500;
        transform-origin: 0 0;
        transition: all .2s ease;
    }

    input {
        padding: 8px 5px 0 5px;
        width: calc(100% - 10px);
        border: 0;
        border-radius: 5px;
        font-family: inherit;
        height: 25px;
        font-size: 18px;
        font-weight: 500;
        background: white;
        color: #223254;
        transition: all .15s ease;

        &:not(:placeholder-shown) {
            + span {
                transform: translateY(-8px) scale(.55);
            }
        }
        &:focus {
            outline: none;

            + span {
                transform: translateY(-8px) scale(.55);
            }
        }
    }
</style>
