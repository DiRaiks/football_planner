<template>
    <div class="home">
        <div class="nav">
            <span @click="gotToHome">Матчи</span> / <span class="active">Обзор матча</span>
        </div>
        <div v-if="currentEvent" class="columnWr">
            <div class="leftColumn">
                <Table/>
            </div>
            <div class="rightColumn">
                <h3 :class="headerClass">{{ rightBlockHeader }}</h3>
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
import Table from '@/components/reusableComponents/table/Table.vue';
import EventForm from '@/components/reusableComponents/eventForm/EventForm.vue';
import PlayerForm from '@/components/reusableComponents/playerForm/PlayerForm.vue';

import { EventItem, UserObj, PlayerItem } from '@/store/types';

@Component({
    components: {
        Button,
        Table,
        EventForm,
        PlayerForm,
    },
})

export default class EventPage extends Vue {
    protected isEditEvent: boolean = false;
    protected isEditPlayer: boolean = false;
    protected isSetNewPlayer: boolean = false;

    @Action('setCurrentEventId', { namespace: 'events' })
    private setCurrentEventId!: any;
    @Action('getEvents', { namespace: 'events' })
    private getEvent!: any;
    @Getter('getCurrentEvent', { namespace: 'events' })
    private currentEvent!: EventItem;
    @Getter('getCurrentUser', { namespace: 'auth' })
    private currentUser!: UserObj;
    @Getter('getAlreadySignedUp', { namespace: 'players' })
    private alreadySignedUp!: PlayerItem;

    get isEventCreator(): boolean { return this.currentEvent.creatorId === this.currentUser._id; }
    get rightBlockHeader(): string { return this.isEventCreator ? 'Вы организатор события' : this.playerHeader; }
    get playerHeader(): string { return this.alreadySignedUp ? 'Вы уже записались' : 'Вы пока не записаны'; }
    get headerClass(): object { return { active: this.alreadySignedUp }; }
    get buttonText(): string { return this.alreadySignedUp ? 'Изменить решение' : 'Принять участие'; }

    protected gotToHome(): void { router.push('/'); }
    protected openEditEvent(): void { this.isEditEvent = true; }
    protected playerButtonHandler(): void {
        if (this.alreadySignedUp) this.isEditPlayer = true;
        else this.isSetNewPlayer = true;
    }
    protected closeEditEvent(): void { this.isEditEvent = false; }
    protected closeEditPlayer(): void {
        this.isSetNewPlayer = false;
        this.isEditPlayer = false;
    }

    private async mounted() {
        const { eventId } = this.$route.params;

        if (eventId) await this.setCurrentEventId(eventId);
        else router.push('/');
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
        max-width: 1100px;
        margin: auto;
        padding: 10px;
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

    .leftColumn {
        width: 500px;
    }

    .rightColumn {
        width: 500px;
        text-align: left;
        padding-top: 50px;

        .editEventButton {
            margin-right: 10px;
            margin-bottom: 10px;
        }

        h3 {
            text-align: left;

            &.active {
                color: #218012;
            }
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

        .leftColumn {
            max-width: 500px;
            width: 100%;
            margin: auto;
            display: flex;
            flex-direction: column;
            align-items: center;
        }

        .rightColumn {
            max-width: 500px;
            width: 100%;
            margin: auto;
            margin-top: 0;
            padding: 0 0 200px;

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
    }

    @media (max-width: 475px) {

        .leftColumn {
            width: 100%;
        }

        .rightColumn {
            width: 100%;
            margin-top: 0;
            padding: 0 0 200px;
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
</style>
