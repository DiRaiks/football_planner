<template>
    <div class="home">
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

import Button from '@/components/reusableComponents/button/Button.vue';
import Input from '@/components/reusableComponents/input/Input.vue';
import Table from '@/components/reusableComponents/table/Table.vue';

import { EventItem } from '@/store/types';

@Component({
    components: {
        Button,
        Input,
        Table,
    },
})

export default class EventPage extends Vue {
    protected peopleName: string = '';
    protected friends: string[] = [''];
    protected minimum: number = 0;
    protected status: boolean = true;

    @Action('setPlayersData', {namespace: 'players'})
    private setPlayersData!: any;
    @Action('getEvents', {namespace: 'events'})
    private getEvent!: any;
    @Action('setEventMinimum', {namespace: 'events'})
    private setEventMinimum!: any;
    @Getter('getCurrentEvent', {namespace: 'events'})
    private currentEvent!: EventItem;

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

            this.setPlayersData({name: this.peopleName, friends: filteredFriends, status: this.status});
            this.peopleName = '';
            this.friends = [''];
        }
    }

    protected saveMinimum(): void {
        this.setEventMinimum(this.minimum);
    }

    private async mounted() {
        if (this.currentEvent) {
            this.minimum = this.currentEvent.minimum;
        }
    }
}
</script>

<style scoped lang="scss">
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

    .addPeopleBlock {
        display: flex;
        justify-content: space-around;
        padding: 15px 20px;
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
