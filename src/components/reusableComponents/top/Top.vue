<template>
    <div :class="currentClass">
        <div>Баги/предложения: телега @dir_andrew</div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Getter } from 'vuex-class';

import { EventItem } from '@/store/types';


@Component
export default class Top extends Vue {
    @Getter('getCurrentEvent', { namespace: 'events' })
    private currentEvent!: EventItem;
    @Getter('getPeopleDataCount', { namespace: 'players' })
    private peopleDataCount!: number;

    get currentColor(): string {
        // return this.peopleDataCount >= this.currentEvent.minimum ? 'positive' : 'negative';
        return 'positive';
    }

    get currentClass(): object {
        const { currentColor } = this;
        return {
            top: true,
            [`top-${ currentColor }`]: currentColor,
        };
    }
    get currentText(): string {
        // return this.peopleDataCount >= this.currentEvent.minimum ? '' : 'НЕДОСТАТОЧНО ЛЮДЕЙ';
        return '';
    }
}
</script>

<style scoped lang="scss">
    .top {
        width: 100%;
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 16px;

        &-positive {
            background: aquamarine;
        }

        &-negative {
            background: rgba(255, 0, 3, 0.48);
        }
    }
</style>
