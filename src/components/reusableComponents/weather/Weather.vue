<template>
    <div class="weatherWr">
        <div v-for="(day, index) in weatherByDays" class="weather">
            <div class="date">{{formatDate(day.dt)}}</div>
            <img class="icon" :src="`http://openweathermap.org/img/wn/${day.weatherObj.icon}.png`" alt="">
            <div class="temp">
                <div class="maxTemp"><span>{{ formatTemp(day.temp.max) }}</span></div>
                <div><span>{{formatTemp(day.temp.min)}}</span></div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';
    import { Action, Getter } from 'vuex-class';

    import { Daily } from '@/store/types';

    @Component
    export default class Weather extends Vue {
        @Action('getWeather', { namespace: 'weather' })
        private getWeather!: any;
        @Getter('getWeatherByDays', { namespace: 'weather' })
        private weatherByDays!: Array<Partial<Daily>>;

        protected formatTemp(temp: number): number {
            return Math.floor(temp);
        }
        protected formatDate(timestamp: number): string {
            return new Date(timestamp * 1000).toLocaleDateString('ru-RU').slice(-13, -5);
        }

        private async mounted() {
            await this.getWeather();
        }
    }
</script>

<style scoped lang="scss">
    .weatherWr {
        display: flex;
        justify-content: center;

        .weather {
            margin-right: 10px;
            position: relative;
            text-align: right;

            &:last-child {
                margin: 0;
            }
        }

        .date {
            font-size: 14px;
        }

        .temp {
            position: absolute;
            top: 40px;
            right: -4px;
            font-size: 10px;
            width: 10px;

            div {
                height: 15px;
            }

            .maxTemp {
                border-bottom: 1px solid black;
            }
        }
    }

    @media (max-width: 1250px) {
        .weatherWr {
            .weather {
                margin-right: 5px;
            }
        }
    }

    @media (max-width: 475px) {
        .weatherWr {
            font-size: 12px;

            .icon {
                display: none;
            }

            .weather {
                height: 50px;
                margin-right: 10px;
            }

            .temp {
                right: 50%;
                margin: 0 -5px;
                top: 20px;
            }
        }
    }
</style>
