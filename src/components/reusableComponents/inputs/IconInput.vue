<template>
    <div class="iconInput">
        <div class="icon">
            <slot/>
        </div>
        <BaseInput
            class="baseInput"
            :type="type"
            :placeholder="placeholder"
            :min="min"
            :max="max"
            v-model="inputValue"
        />
    </div>
</template>

<script lang="ts">
import { Component, Prop, Watch, Vue } from 'vue-property-decorator';

import BaseInput from './BaseInput.vue';

@Component({
    components: {
        BaseInput,
    },
})export default class IconInput extends Vue {
    protected inputValue: string | number | boolean = '';

    @Prop({ default: 'default' }) private viewType!: string;
    @Prop({ default: '' }) private value!: string | number | boolean;
    @Prop() private placeholder!: string;
    @Prop() private type!: string;
    @Prop() private input!: () => void;
    @Prop() private filter!: (value: string) => void;
    @Prop({ default: -99999 }) private min!: number;
    @Prop({ default: 99999 }) private max!: number;

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
    .iconInput {
        position: relative;
        display: inline-block;
        width: 100%;

        .icon {
            position: absolute;
            z-index: 1;
            top: 50%;
            left: 10px;
            margin: -8px 0;
        }

        .baseInput {
            padding-left: 40px;
            width: 100%;
            box-sizing: border-box;
            border-color: #858585;
        }
    }
</style>
