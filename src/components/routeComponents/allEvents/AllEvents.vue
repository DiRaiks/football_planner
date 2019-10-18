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
