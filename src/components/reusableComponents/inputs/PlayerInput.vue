<template>
    <div class="playerWr">
        <div class="playerInput">
            <StyleInput
                :type="type"
                :label="label"
                :min="min"
                :max="max"
                :id="id"
                v-model="inputValue"
            />
        </div>
        <div @click="statusHandler" class="options">
            <div :class="['option', 'forsure', ...forsureClass]">Точно буду</div>
            <div :class="['option', 'maybe', ...maybeClass]">Может буду</div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Watch, Vue } from 'vue-property-decorator';

import StyleInput from './StyleInput.vue';

@Component({
    components: {
        StyleInput,
    },
})
export default class PlayerInput extends Vue {
    protected inputValue: string | number | boolean = '';

    @Prop({ default: '' }) private value!: string | number | boolean;
    @Prop({ default: '' }) private label!: string;
    @Prop() private type!: string;
    @Prop() private input!: () => void;
    @Prop() private filter!: (value: string) => void;
    @Prop({ default: -99999 }) private min!: number;
    @Prop({ default: 99999 }) private max!: number;
    @Prop({ default: true }) private status!: boolean;
    @Prop() private changeStatus!: (value: boolean) => void;
    @Prop() private id!: string;

    get forsureClass(): object { return { active: this.status }; }
    get maybeClass(): object { return { active: !this.status }; }

    protected statusHandler(event: any): void {
        if (event.target.closest('.maybe')) this.$emit('changeStatus', false);
        else if (event.target.closest('.forsure')) this.$emit('changeStatus', true);
    }

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
    .playerWr {
        display: flex;

        .playerInput {
            flex: 3;
            margin-right: 5px;
        }

        .options {
            display: flex;
            background-color: #fff;
            border-radius: 5px;
            padding: 5px;
            font-size: 14px;
            transition: all 0.2s;
            width: auto;
            color: #444;
            vertical-align: top;
            cursor: pointer;

            .option {
                padding: 4px 8px;
                border-radius: 3px;
                line-height: 14px;

                &.active.forsure {
                    color: #155724;
                    background-color: #d4edda;
                    box-shadow: inset 0px 0px 0px 1px #c3e6cb;
                }

                &.active.maybe {
                    color: #856404;
                    background-color: #fff3cd;
                    box-shadow: inset 0px 0px 0px 1px #ffeeba;
                }
            }
        }
    }
</style>
