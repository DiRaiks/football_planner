<template>
    <div class="allEventsWr">
        <h1>Football Planner</h1>
        <div class="columnWr">
            <div class="leftColumn">
                <div v-if="activeEvents.length" class="openMatch">
                    <h3>Открытые Матчи</h3>
                    <div
                        v-for="event in activeEvents"
                        :id="event._id"
                        class="previewWr"
                    >
                        <EventPreview :event="event"/>
                    </div>
                </div>
                <div v-if="oldEvents.length" class="oldMatch">
                    <h3>Прошедшие Матчи</h3>
                    <div
                        v-for="event in oldEvents"
                        :id="event._id"
                        class="previewWr"
                    >
                        <EventPreview :event="event"/>
                    </div>
                </div>
            </div>
            <div class="rightColumn">
                <div class="newEventWr">
                    <h3>Новое событие</h3>
                    <div class="createEventBlock">
                        <div><StyleInput type="text" label="Название встречи" v-model="eventName"/></div>
                        <div><StyleInput type="text" label="Адрес встречи" v-model="place"/></div>
                        <div class="dateTime">
                            <div class="date"><StyleInput type="date" label="Дата" v-model="date"/></div>
                            <div class="time"><StyleInput type="time" label="Время" v-model="time"/></div>
                        </div>
                        <div><StyleInput type="number" nim="10" max="22" label="Количество игроков" v-model="minimum"/></div>
                    </div>
                    <div class="buttonWr">
                        <Button class="addEventButton" text="Добавить событие"
                                @onClick="setNewEvent"/>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Action, Getter } from 'vuex-class';

import Button from '@/components/reusableComponents/button/Button.vue';
import Input from '@/components/reusableComponents/input/Input.vue';
import EventPreview from '@/components/routeComponents/allEvents/EventPreview.vue';
import StyleInput from '@/components/reusableComponents/styleInput/StyleInput.vue';

import { EventItem } from '@/store/types';

@Component({
    components: {
        Button,
        Input,
        EventPreview,
        StyleInput,
    },
})

export default class AllEvents extends Vue {
    protected eventName: string = '';
    protected place: string = '';
    protected time: string = '';
    protected date: string = '';
    protected minimum: string = '';

    @Action('saveNewEvent', {namespace: 'events'})
    private saveNewEvent!: any;
    @Getter('getActiveEvents', {namespace: 'events'})
    private activeEvents!: EventItem[];
    @Getter('getOldEvents', {namespace: 'events'})
    private oldEvents!: EventItem[];

    protected setNewEvent(): void {
        if (!this.time || !this.place || !this.date || !this.eventName || !this.minimum) {
            return;
        }
        this.saveNewEvent({
            time: this.time,
            place: this.place,
            date: this.date,
            minimum: +this.minimum,
            eventName: this.eventName,
        });

        this.place = '';
        this.time = '';
        this.date = '';
        this.eventName = '';
        this.minimum = '';
    }
}
</script>

<style scoped lang="scss">
    .allEventsWr {
        height: 100%;
        padding: 20px;
        text-align: left;

        h1 {
            text-align: center;
        }

        .columnWr {
            margin-top: 60px;
            padding: 20px;
            display: flex;
            justify-content: space-around;

            .leftColumn {
                .oldMatch {
                    margin-top: 40px;

                    .previewWr {
                        opacity: .5;
                    }
                }
            }

            .rightColumn {
                text-align: left;

                .createEventBlock {
                    width: 370px;
                    border-radius: 10px;
                    padding: 10px;
                    background-color: #eeeeee;

                    div {
                        margin-top: 10px;

                        &:nth-of-type(1) {
                            margin: 0;
                        }
                    }

                    .dateTime {
                        display: flex;

                        .date {
                            flex: 3;
                        }

                        .time {
                            margin: 0 0 0 10px;
                            flex: 1;
                        }
                    }
                }

                .buttonWr {
                    margin-top: 20px;
                    display: flex;
                    justify-content: flex-end;
                }
            }
        }

        .previewWr {
            margin-top: 20px;

            &:nth-of-type(1) {
                margin: 0;
            }
        }

        @media (max-width: 1250px) {
            .columnWr {
                flex-direction: column;
            }

            .rightColumn {
                margin-top: 40px;

            }

            .leftColumn {

            }
        }
    }
</style>
