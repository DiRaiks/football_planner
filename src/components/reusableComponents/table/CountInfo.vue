<template>
    <div class="countInfo">
        <div class="countLine">
            <template v-for="item in currentProgress">
                <div :class="getChunkClass(item)" ></div>
            </template>
        </div>
        <div :class="optionsClass">
            <div class="option">Мало<br>игроков</div>
            <div class="option miniField">
                <div class="separator left"></div>
                <span>
                    Маленькое<br>поле
                </span>
                <div class="separator right"></div>
            </div>
            <div class="option">Большое<br>поле</div>
        </div>
        <div class="total-info">
            <div class="info minimum">Минимально: {{ currentEvent.minimum }}</div>
            <div class="info current">Всего:
                <div :class="currentValueClass">{{ playersDataCount }}</div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Getter } from 'vuex-class';

import { PlayerItem, EventItem } from '@/store/types';

@Component
export default class CountInfo extends Vue {
    @Getter('getCurrentEvent', { namespace: 'events' })
    protected currentEvent!: EventItem;
    @Getter('getPlayersDataCount', { namespace: 'players' })
    protected playersDataCount!: number;
    @Getter('getAllPlayers', { namespace: 'players' })
    protected currentProgress!: object[];

    get activeFiled(): string {
        return this.playersDataCount >= this.currentEvent.minimum ?
            this.playersDataCount < 22 ?
            'miniField' : 'normalField' : '';
    }
    get optionsClass(): object {
        return {
            options: true,
            notEnough: this.playersDataCount < this.currentEvent.minimum,
            [`${this.activeFiled}`]: true,
        };
    }
    get currentValueClass(): object {
        return {
            currentValue: true,
            satisfied: this.playersDataCount >= this.currentEvent.minimum,
        };
    }

    protected getChunkClass(item: PlayerItem): object {
        if (item) {
            return {
                chunk: true,
                [`chunk-${ item.status ? 'true' : 'maybe' }`]: true,
            };
        }
        return { chunk: true };

    }
}
</script>

<style scoped lang="scss">
    .countInfo {
        width: 95%;
        padding: 5px 10px;
        margin-bottom: 10px;
    }

    .countLine {
        display: grid;
        grid-template-columns: repeat(22, 1fr);
        grid-gap: 2px;


        .chunk {
            height: 6px;
            background-color: #eee;
            border-radius: 5px;

            &-true {
                background-color: #c3e6cb;
            }

            &-maybe {
                background-color: #ffeeba;
            }

            &:last-child {
                margin-right: 0;
            }
        }
    }

    .options {
        margin-top: 5px;
        display: grid;
        grid-template-columns: 10fr 6fr 6fr;
        grid-gap: 1px;

        &.notEnough {
            div:nth-child(1) {
                opacity: 1;
            }
        }

        &.miniField {
            div:nth-child(2) {
                opacity: 1;
            }
        }

        &.normalFiled {
            div:nth-child(3) {
                opacity: 1;
            }
        }

        .option {
            background-color: white;
            text-align: center;
            opacity: 0.1;

            &.miniField {
                position: relative;

                .separator {
                    position: absolute;
                    width: 1px;
                    height: 20px;
                    background-color: grey;

                    &.right {
                        top: 0;
                        right: 0;
                    }
                }
            }
        }
    }

    .total-info {
        text-align: right;
        display: block;
        width: 96%;
        padding: 2%;

        .currentValue {
            display: inline-block;
            font-size: 24px;
            font-weight: 500;
            color: #dc3545;
        }

        .satisfied {
            color: #28a745;
        }
    }
</style>
