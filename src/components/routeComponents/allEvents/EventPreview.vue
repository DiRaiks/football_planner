<template>
    <div @click="selectEvent" :class="previewBlockClass">
        <div class="previewBlockSpinner"></div>
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
    @Action('setCurrentEventId', { namespace: 'events' })
    private setCurrentEventId!: any;
    @Getter('getCurrentUser', { namespace: 'auth' })
    private currentUser!: UserObj;
    @Getter('getIsDeleteEventPending', { namespace: 'events' })
    private isDeletePendingEvents!: string[];
    @Getter('getIsSelectEventPending', { namespace: 'events' })
    private isSelectPendingEvents!: string[];

    get valueClass(): object {
        return {
            value: true,
            satisfied: this.event.playersAmount >= this.event.minimum,
        };
    }
    get isEventCreator(): boolean { return this.event.creatorId === this.currentUser._id; }
    get previewBlockClass(): object {
        return {
            previewBlock: true,
            previewBlockPending: this.isCurrentEventDelete || this.isCurrentEventSelect,
        };
    }
    get isCurrentEventDelete(): string | undefined {
        return this.isDeletePendingEvents.find((eventId: string) => {
            return eventId === this.event._id;
        });
    }
    get isCurrentEventSelect(): string | undefined {
        return this.isSelectPendingEvents.find((eventId: string) => {
            return eventId === this.event._id;
        });
    }

    protected async selectEvent(): Promise<void> {
        if (this.isCurrentEventDelete || this.isSelectPendingEvents.length) return;

        await this.setCurrentEventId(this.event._id);

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
        position: relative;

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

        &.previewBlockPending {
            transition: all ease-in 0.15s;
            cursor: default;

            .previewBlockSpinner {
                opacity: 1;
                transition: all ease-in 0.1s;
            }
        }

        .previewBlockSpinner {
            width: 70px;
            height: 70px;
            opacity: 0;
            position: absolute;
            left: 50%;
            top: 50%;
            margin: -35px;
            background-image: url('../../../assets/big-spinner.svg');

            animation: buttonSpinner 1.5s linear infinite;
        }

        @media (max-width: 475px) {
            width: auto;
        }
    }

    @keyframes buttonSpinner {
        0% {
            transform: rotate(0);
            animation-timing-function: cubic-bezier(.55,.055,.675,.19);
        }
        50% {
            transform: rotate(180deg);
            animation-timing-function: cubic-bezier(.215,.61,.355,1);
        }
        100% {
            transform: rotate(360deg);
        }
    }
</style>
