<template>
    <div @click="selectEvent" class="previewBlock">
        <div class="nameWr">
            <span>{{ event.eventName }}</span>
            <span v-if="isEventCreator" class="deleteButton" @click="deleteCurrentEvent">x</span>
        </div>
        <div class="details">
            <div class="place">
                <div class="adress">{{ event.place }}</div>
                <div class="date">{{ event.date }}, {{ event.time }}</div>
            </div>
            <div class="players">
                <span class="playersAmount"><span :class="valueClass">{{ event.playersAmount }}</span> /</span>
                {{ event.minimum }}
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { Action, Getter } from 'vuex-class';
import router from '@/router';

import { EventItem, UserObj } from '@/store/types';

@Component
export default class EventsPreview extends Vue {
    @Prop() private event!: EventItem;

    @Action('deleteEvent', {namespace: 'events'})
    private deleteEvent!: any;
    @Getter('getCurrentUser', { namespace: 'auth' })
    private currentUser!: UserObj;

    get valueClass(): object {
        return {
            value: true,
            satisfied: this.event.playersAmount >= this.event.minimum,
        };
    }
    get isEventCreator(): boolean { return this.event.creatorId === this.currentUser._id; }

    protected async selectEvent(): Promise<void> {
        router.push(`/event/${ this.event._id }`);
    }
    protected deleteCurrentEvent(event: any): void {
        event.stopPropagation();
        this.deleteEvent(this.event._id);
    }
}
</script>

<style scoped lang="scss">
    .previewBlock {
        width: auto;
        border-radius: 10px;
        padding: 10px;
        background-color: #eeeeee;
        cursor: pointer;

        &:hover {
            background-color: #cdcdcd;
        }

        .nameWr {
            display: flex;
            justify-content: space-between;

            .deleteButton {
                padding: 6px;
                line-height: 6px;
                border-radius: 4px;
                z-index: 2;

                &:hover {
                    background: #9b9b9b;
                }
            }
        }

        .details {
            margin-top: 20px;
            display: flex;
            justify-content: space-between;
            align-items: flex-end;

            .place {
                font-size: 12px;
                text-align: left;
            }

            .players {
                font-size: 12px;

                .playersAmount {
                    font-size: 16px;

                    .value {
                        color: #dc3545;

                        &.satisfied {
                            color: #28a745;
                        }
                    }
                }
            }
        }

        @media (max-width: 475px) {
            width: auto;
        }
    }
</style>
