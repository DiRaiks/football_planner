<template>
    <div class="tooltip" >
        <div :style="tooltipTextStyle" ref="tooltipText" class="tooltipText">{{ tooltip }}</div>
        <div class="tooltipArrow"/>
        <slot></slot>
    </div>
</template>

<script lang="ts">
    import { Component, Prop, Vue } from 'vue-property-decorator';

    @Component
    export default class Tooltip extends Vue {
        protected textWidth: number = 0;

        @Prop() private tooltip!: string;

        get calculatedTextWidth(): number {
            return Math.round(this.textWidth / 2);
        }

        get tooltipTextStyle(): object {
            return {
                left: `calc(50% - ${ this.calculatedTextWidth }px)`,
            };
        }

        private mounted() {
            const el = this.$refs.tooltipText as HTMLElement;
            this.textWidth = el.offsetWidth;
        }
    }
</script>

<style scoped lang="scss">
    .tooltipText, .tooltipArrow {
        box-sizing: border-box;
        transition: .4s ease-in-out;
    }

    .tooltip {
        position: relative;
        color: white;
        display: inline-block;
        margin-right: 2px;

        & .tooltipText, & .tooltipArrow{
            position: absolute;
            opacity: 0;
            visibility: hidden;
        }

        & .tooltipText {
            padding: 0 10px;
            line-height: 30px;
            background: #02a9f4;
            border-radius: 5px;
            bottom: 50px;
            left: calc(50% - 70px);
        }

        & .tooltipArrow {
            content: "";
            width: 0;
            height: 0;
            border: 10px solid transparent;
            border-top-color: #02a9f4;
            bottom: 30px;
            left: calc(50% - 10px);
        }

        &:hover .tooltipText, &:hover .tooltipArrow {
            opacity: 1;
            visibility: visible;
            transition: .2s ease-in-out .4s; /* сделаем появление подсказки с задержкой */
        }

        &:hover .tooltipText {
            bottom: 30px;
        }

        &:hover .tooltipArrow {
            bottom: 10px;
        }
    }
</style>
