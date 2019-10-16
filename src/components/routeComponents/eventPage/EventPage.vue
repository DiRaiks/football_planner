<template>
    <div class="home">
        <div class="nav">
            <span @click="gotToHome">Матчи</span> / <span class="active">Обзор матча</span>
        </div>
        <div v-if="currentEvent" class="columnWr">
            <div class="leftColumn">
                <div class="minInputWr">
                    <Input
                        placeholder="Минимум"
                        type="number"
                        :min="0" :max="20"
                        label="Минимум игроков"
                        v-model="minimum"
                    />
                    <Button class="saveMinimum" text="Изменить" @onClick="saveMinimum"/>
                </div>
                <Table/>
            </div>
            <div class="rightColumn">
                <h3>{{ rightBlockHeader }}</h3>
                <Button
                    v-if="isEventCreator && !isEditEvent && !isSetNewPlayer && !isEditPlayer"
                    class="editEventButton"
                    text="Редактировать событие"
                    @onClick="openEditEvent"
                />
                <EventForm v-if="isEditEvent" :isEdit="true" :callback="closeEditEvent"/>
                <PlayerForm
                    v-if="isEditPlayer || isSetNewPlayer"
                    :alreadySignedUp="alreadySignedUp"
                    :isEdit="isEditPlayer"
                    :callback="closeEditPlayer"
                />
                <Button
                    v-if="!isEditPlayer && !isSetNewPlayer && !isEditEvent"
                    :text="buttonText"
                    @onClick="playerButtonHandler"
                />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Action, Getter } from 'vuex-class';
import router from '@/router';

import Button from '@/components/reusableComponents/button/Button.vue';
import Input from '@/components/reusableComponents/input/Input.vue';
import Table from '@/components/reusableComponents/table/Table.vue';
import EventForm from '@/components/reusableComponents/eventForm/EventForm.vue';
import PlayerForm from '@/components/reusableComponents/playerForm/PlayerForm.vue';

import { EventItem, UserObj, PlayerItem } from '@/store/types';

@Component({
    components: {
        Button,
        Input,
        Table,
        EventForm,
        PlayerForm,
    },
})

export default class EventPage extends Vue {
    protected minimum: number = 0;
    protected isEditEvent: boolean = false;
    protected isEditPlayer: boolean = false;
    protected isSetNewPlayer: boolean = false;

    @Action('setCurrentEventId', { namespace: 'events' })
    private setCurrentEventId!: any;
    // @Action('setNewPlayer', { namespace: 'players' })
    // private setNewPlayer!: any;
    @Action('getEvents', { namespace: 'events' })
    private getEvent!: any;
    @Action('setEventMinimum', { namespace: 'events' })
    private setEventMinimum!: any;
    @Getter('getCurrentEvent', { namespace: 'events' })
    private currentEvent!: EventItem;
    @Getter('getCurrentUser', { namespace: 'auth' })
    private currentUser!: UserObj;
    @Getter('getAlreadySignedUp', { namespace: 'players' })
    private alreadySignedUp!: PlayerItem;

    get isEventCreator(): boolean {
        return this.currentEvent.creatorId === this.currentUser._id;
    }

    get rightBlockHeader(): string {
        return this.isEventCreator ? 'Вы организатор события' : this.playerHeader;
    }

    get playerHeader(): string {
        return this.alreadySignedUp ? 'Вы уже записались' : 'Вы пока не записаны';
    }

    get buttonText(): string {
        return this.alreadySignedUp ? 'Изменить решение' : 'Принять участие';
    }

    protected saveMinimum(): void {
        this.setEventMinimum(this.minimum);
    }

    protected gotToHome(): void {
        router.push('/');
    }

    protected openEditEvent(): void {
        this.isEditEvent = true;
    }

    protected playerButtonHandler(): void {
        if (this.alreadySignedUp) this.isEditPlayer = true;
        else this.isSetNewPlayer = true;
    }

    protected closeEditEvent(): void {
        this.isEditEvent = false;
    }

    protected closeEditPlayer(): void {
        this.isSetNewPlayer = false;
        this.isEditPlayer = false;
    }

    private async mounted() {
        const { eventId } = this.$route.params;

        if (eventId) await this.setCurrentEventId(eventId);
        else router.push('/');

        if (this.currentEvent) {
            this.minimum = this.currentEvent.minimum;
        }
    }
}
</script>

<style scoped lang="scss">
    .home {
        .nav {
            padding: 20px;
            text-align: left;

            span {
                cursor: pointer;
                color: rgba(0, 132, 254, 0.45);

                &:hover {
                    color: #0084FE;
                    border-bottom: 1px solid #0084FE;
                }

                &.active {
                    color: #0084FE;
                }
            }
        }
    }
    .columnWr {
        padding: 20px;
        display: flex;
        justify-content: space-around;
    }

    .inputWr {
        display: flex;
        flex-direction: column;
        width: 400px;

        label:first-child {
            font-weight: bold;
        }
    }

    .minInputWr {
        display: flex;
        align-items: center;
    }

    .rightColumn {

        .editEventButton {
            margin-right: 20px;
        }

        h3 {
            text-align: left;
            color: #218012;
        }

        .addPeopleBlock {
            display: flex;
            justify-content: space-around;
            padding: 15px 20px;
        }
    }

    @media (max-width: 1250px) {
        .columnWr {
            flex-direction: column;
        }

        .rightColumn {
            margin-top: 40px;

            .inputWr {
                margin: 30px auto 0;
            }

            .addPeopleBlock {
                justify-content: center;

                .savePeople {
                    margin-left: 40px;
                }
            }
        }

        .leftColumn {
            display: flex;
            flex-direction: column;
            align-items: center;
        }
    }

    @media (max-width: 475px) {
        .tableWr {
            font-size: 12px;
        }

        .inputWr {
            width: auto;
        }

        .horizontalLine {

            .placeWr {
                width: auto;
            }
        }
    }

    @media (max-width: 350px) {
        .tableWr {
            font-size: 8px;
        }
    }
</style>
