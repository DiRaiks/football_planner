<template>
    <div class="playerWr">
        <div class="playersBlock">
                <PlayerInput
                    type="text"
                    label="Ваше имя"
                    v-model="playerName"
                    :status="status"
                    @changeStatus="changeStatus"
                />
            <div class="friendsWr">
                <PlayerInput
                    v-for="(friend, index) in friends"
                    :key="index"
                    :id="`player_${index}`"
                    type="text"
                    label="Имя друга"
                    v-model="friends[index].name"
                    :status="friends[index].status"
                    @changeStatus="changeFriendStatus($event, index)"
                />
            </div>
        </div>
        <div class="buttonWr">
            <Button class="addEventButton" :text="buttonText"
                    @onClick="buttonHandler"/>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Watch, Vue } from 'vue-property-decorator';
import { Action, Getter } from 'vuex-class';

import StyleInput from '@/components/reusableComponents/styleInput/StyleInput.vue';
import PlayerInput from '@/components/reusableComponents/playerInput/PlayerInput.vue';
import Button from '@/components/reusableComponents/button/Button.vue';

import { PlayerItem, FriendItem } from '@/store/types';

@Component({
    components: {
        PlayerInput,
        Button,
        StyleInput,
    },
})
export default class PlayerForm extends Vue {
    protected playerName: string = '';
    protected friends: FriendItem[] = [{ name: '' , status: true }];
    protected minimum: number = 0;
    protected status: boolean = true;

    @Prop({ default: false }) private isEdit!: boolean;
    @Prop() private callback!: any;
    @Prop() private alreadySignedUp!: PlayerItem;

    @Action('setNewPlayer', { namespace: 'players' })
    private setNewPlayer!: any;
    @Action('changePlayer', { namespace: 'players' })
    private changePlayer!: any;

    get buttonText(): string {
        return this.isEdit ? 'Применить' : 'Принять участие';
    }

    get filteredFriends(): FriendItem[] {
        return this.friends.filter((friend: FriendItem) => {
            if (friend.name) return friend;
        });
    }

    protected changeStatus(status: boolean): void {
        this.status = status;
    }

    protected changeFriendStatus(status: boolean, index: number): void {
        this.friends[index].status = status;
    }

    protected async buttonHandler(): Promise<void> {
        if (this.isEdit) {
            this.changePlayer({ name: this.playerName, friends: this.filteredFriends, status: this.status });
        } else {
            if (!this.playerName) return;
            this.setNewPlayer({ name: this.playerName, friends: this.filteredFriends, status: this.status });
        }

        if (this.callback) this.callback();

        this.playerName = '';
        this.friends = [{ name: '' , status: true }];
    }

    @Watch('friends', { deep: true })
    private changeInput(val: FriendItem[]) {
        const lastItemIndex = val.length - 1;
        if (val[lastItemIndex].name) {
            if (val.length < 4) val.push({ name: '', status: true });
        }
        if (val[lastItemIndex - 1] && !val[lastItemIndex - 1].name) val.pop();
    }

    private mounted() {
        if (this.isEdit) {
            this.playerName = this.alreadySignedUp.name;
            this.status = this.alreadySignedUp.status;
            if (this.alreadySignedUp.friends.length) this.friends = this.alreadySignedUp.friends;
        }
    }
}
</script>

<style scoped lang="scss">
    .playersBlock {
        width: 430px;
        border-radius: 10px;
        padding: 5px;
        background-color: #eeeeee;

        div {
            margin-top: 5px;

            &:nth-of-type(1) {
                margin: 0;
            }
        }

        .friendsWr {
            margin-top: 15px;
        }
    }

    .buttonWr {
        margin-top: 20px;
        display: flex;
        justify-content: flex-end;
    }
</style>
