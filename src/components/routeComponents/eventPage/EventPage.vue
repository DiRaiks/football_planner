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
                <Button v-if="isEventCreator && !isEditEvent" text="Редактировать событие" @onClick="openEditEvent"/>
                <EventForm v-if="isEditEvent" :isEdit="true" :callback="closeEditEvent"/>
                <div class="addPeopleBlock">
                    <Button text="Добавить друга" @onClick="addFriend"/>
                    <Button class="savePeople" text="Сохранить" viewType="positive" @onClick="savePeople"/>
                </div>
                <div class="inputWr">
                    <Input type="checkbox" label="Точно буду" v-model="status"/>
                    <Input placeholder="Своё имя" type="text" label="Своё имя" v-model="peopleName"/>
                    <Input
                        v-for="(friend, index) in friends"
                        :key="index"
                        placeholder="Имя друга"
                        type="text"
                        :label="`Имя друга ${index + 1}`"
                        v-model="friends[index]"
                    />
                </div>
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

import { EventItem, UserObj, PlayerItem } from '@/store/types';

@Component({
    components: {
        Button,
        Input,
        Table,
        EventForm,
    },
})

export default class EventPage extends Vue {
    protected peopleName: string = '';
    protected friends: string[] = [''];
    protected minimum: number = 0;
    protected status: boolean = true;
    protected isEditEvent: boolean = false;

    @Action('setCurrentEventId', { namespace: 'events' })
    private setCurrentEventId!: any;
    @Action('setNewPlayer', { namespace: 'players' })
    private setNewPlayer!: any;
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

    protected addFriend(): void {
        if (this.friends.length > 4) {
            return;
        }
        this.friends.push('');
    }

    protected savePeople(): void {
        if (this.peopleName) {
            const filteredFriends = this.friends.filter((friend: string) => {
                if (friend) {
                    return friend;
                }
            });

            this.setNewPlayer({name: this.peopleName, friends: filteredFriends, status: this.status});
            this.peopleName = '';
            this.friends = [''];
        }
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

    protected closeEditEvent(): void {
        this.isEditEvent = false;
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
