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
                    <EventForm/>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Action, Getter } from 'vuex-class';

import EventPreview from '@/components/routeComponents/allEvents/EventPreview.vue';
import EventForm from '@/components/reusableComponents/eventForm/EventForm.vue';

import { EventItem } from '@/store/types';

@Component({
    components: {
        EventPreview,
        EventForm,
    },
})

export default class AllEvents extends Vue {
    @Action('getEvents', { namespace: 'events' })
    private getEvents!: any;
    @Getter('getActiveEvents', {namespace: 'events'})
    private activeEvents!: EventItem[];
    @Getter('getOldEvents', {namespace: 'events'})
    private oldEvents!: EventItem[];

    private async mounted() {
        await this.getEvents();
    }
}
</script>

<style scoped lang="scss">
    .allEventsWr {
        height: 100%;
        padding: 20px 10px;
        text-align: left;

        h1 {
            padding: 10px 25px 0;
            width: auto;
            max-width: 1100px;
            margin: 20px auto 30px;
            text-align: left;
            box-sizing: border-box;
        }

        .columnWr {
            max-width: 1100px;
            margin: auto; 
            display: flex;
            justify-content: space-around;

            .leftColumn {
                width: 500px;

                .openMatch {
                    margin-bottom: 40px;
                }

                .oldMatch {

                    .previewWr {
                        opacity: .5;
                    }
                }
            }

            .rightColumn {
                width: 500px;
                text-align: left;
            }
        }

        .previewWr {
            margin-top: 20px;

            &:nth-of-type(1) {
                margin: 0;
            }
        }

        @media (max-width: 1250px) {
            
            h1 {
                padding: 0;
                max-width: 500px;
            }

            .columnWr {
                flex-direction: column;

                .leftColumn {
                    max-width: 500px;
                    width: 100%;
                    margin: auto;
                }

                .rightColumn {
                    max-width: 500px;
                    width: 100%;
                    margin: auto;
                    margin-top: 40px;
                    padding: 0 0 200px;
                }
            }
        }

        @media (max-width: 475px) {
            
            .columnWr {

                .leftColumn {
                    width: 100%;
                }

                .rightColumn {
                    width: 100%;
                }
            }
        }
    }
</style>
