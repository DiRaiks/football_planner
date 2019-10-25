<template>
    <label :for="currentId">
        <span>{{label}}</span>
        <BaseInput
            :id="currentId"
            :type="type"
            :placeholder="placeholder"
            :min="min"
            :max="max"
            v-model="inputValue"
        />
    </label>
</template>

<script lang="ts">
import { Component, Prop, Watch, Vue } from 'vue-property-decorator';

import BaseInput from './BaseInput.vue';

@Component({
    components: {
        BaseInput,
    },
})export default class LableInput extends Vue {
    protected inputValue: string | number | boolean = '';

    @Prop({ default: 'default' }) private viewType!: string;
    @Prop({ default: '' }) private value!: string | number | boolean;
    @Prop() private label!: string;
    @Prop() private placeholder!: string;
    @Prop() private type!: string;
    @Prop() private input!: () => void;
    @Prop() private filter!: (value: string) => void;
    @Prop({ default: -99999 }) private min!: number;
    @Prop({ default: 99999 }) private max!: number;

    get currentId(): string { return this.label + this.type; }

    @Watch('inputValue')
    private changeInput(val: string) {
        this.$emit('input', val);
    }

    private mounted() {
        this.$nextTick(() => {
            this.inputValue = this.value;
        });
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
</style>
