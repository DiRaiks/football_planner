<template>
    <div class="tableWr">
        <h2 class="headerWr">{{ currentEvent.eventName }}</h2>
        <div class="gameInfo">
            <div class="info place">{{ currentEvent.place }}</div>
            <div class="info date">{{ currentEvent.date }}</div>
            <div class="info time">{{ currentEvent.time }}</div>
        </div>
        <table>
            <thead>
                <tr>
                    <td>№</td>
                    <td>Статус</td>
                    <td class="name">Игрок</td>
                    <td >Друзья</td>
                    <!--<td></td>-->
                </tr>
            </thead>
            <tbody>
                <TableLine
                        v-for="(item, index) in playersData"
                        :key="index"
                        :number="index + 1"
                        :name="item.name"
                        :friends="item.friends"
                        :status="item.status"
                        :id="item._id"
                />
            </tbody>
        </table>
        <CountInfo/>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Getter } from 'vuex-class';

import { PlayerItem } from '@/store/types';
import TableLine from './TableLine.vue';
import CountInfo from './CountInfo.vue';

@Component({
    components: {
        TableLine,
        CountInfo,
    },
})
export default class Table extends Vue {
    @Getter('getPlayersData', { namespace: 'players' })
    private playersData!: PlayerItem[];
    @Getter('getCurrentEvent', { namespace: 'events' })
    private currentEvent!: object;
}
</script>

<style scoped lang="scss">
    .tableWr {
        // padding: 15px 20px;
        font-family: Helvetica, Geneva, Arial, sans-serif;
        font-size: 16px;
        font-weight: 300;
        color: #444;
        width: 100%;

        .headerWr {
            text-align: left;
            margin: 0 0 0 10px;
        }

        .gameInfo {
            display: block;
            width: 100%;
            padding: 10px;
            box-sizing: border-box;
            text-align: left;

            .info {
                margin-bottom: 3px;
            }
            .place {
                font-size: 22px;
            }
        }

        table {
            background-color: #aaa1;
            border-radius: 10px;
            text-align: center;
            border-spacing: 20px 10px;
            width: 100%;

            thead {
                font-weight: 500;
                font-size: 18px;

                .name {
                    text-align: left;
                }
            }

            @media (max-width: 475px) {
                font-size: 14px;
                border-spacing: 5px;
            }
        }
    }
    td {
        padding: 0 10px;

        @media (max-width: 475px) {
            padding: 0 5px;
        }
    }
    .boldRow {
        background: aquamarine;
        font-weight: bold;
    }
    .minimumRow {
        background: rgba(255, 0, 3, 0.48);
    }
</style>
