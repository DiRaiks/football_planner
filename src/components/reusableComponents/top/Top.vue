<template>
    <div :class="currentClass">
        <div>{{ currentText }}</div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Getter } from 'vuex-class';

const namespace: string = 'table';

@Component
export default class Top extends Vue {
    @Getter('getMinimum', { namespace })
    private minimum!: number;
    @Getter('getPeopleDataCount', { namespace })
    private peopleDataCount!: number;

    get currentColor(): string {
        return this.peopleDataCount >= this.minimum ? 'positive' : 'negative';
    }

    get currentClass(): object {
        const { currentColor } = this;
        return {
            top: true,
            [`top-${ currentColor }`]: currentColor,
        };
    }
    get currentText(): string {
        return this.peopleDataCount >= this.minimum ? '' : 'НЕДОСТАТОЧНО ЛЮДЕЙ';
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .top {
        width: 100%;
        height: 100px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 28px;

        &-positive {
            background: aquamarine;
        }

        &-negative {
            background: rgba(255, 0, 3, 0.48);
        }
    }
</style>
