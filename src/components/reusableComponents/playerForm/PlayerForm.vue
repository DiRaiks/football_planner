<template>
    <div class="playerWr">
        <div class="playersBlock">
                <PlayerInput
                    type="text"
                    label="Ваше имя"
                    v-model.trim="playerName"
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
                    v-model.trim="friends[index].name"
                    :status="friends[index].status"
                    @changeStatus="changeFriendStatus($event, index)"
                />
            </div>
        </div>
        <div class="buttonWr">
            <Button class="cancelButton" text="Отмена" :disabled="buttonIsPending"
                    @onClick="cancelHandler"/>
            <Button class="addEventButton" :text="buttonText" :isPending="buttonIsPending"
                    @onClick="buttonHandler"/>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Watch, Vue } from 'vue-property-decorator';
import { Action, Getter } from 'vuex-class';

import StyleInput from '@/components/reusableComponents/inputs/StyleInput.vue';
import PlayerInput from '@/components/reusableComponents/inputs/PlayerInput.vue';
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
    @Action('deletePlayer', { namespace: 'players' })
    private deletePlayer!: any;
    @Action('changeUser', { namespace: 'auth' })
    private changeUser!: any;
    @Getter('getCurrentUser', { namespace: 'auth' })
    private currentUser!: any;
    @Getter('getIsAddPlayerPending', { namespace: 'players' })
    private isAddPlayerPending!: any;
    @Getter('getIsEditPlayerPending', { namespace: 'players' })
    private isEditPlayerPending!: any;
    @Getter('getIsDeletePlayerPending', { namespace: 'players' })
    private isDeletePlayerPending!: any;

    get buttonText(): string { return this.isEdit ? 'Применить' : 'Принять участие'; }
    get filteredFriends(): FriendItem[] {
        return this.friends.filter((friend: FriendItem) => {
            if (friend.name.trim()) return friend;
        });
    }
    get buttonIsPending(): boolean {
        return this.isAddPlayerPending || this.isEditPlayerPending || this.isDeletePlayerPending;
    }

    protected changeStatus(status: boolean): void { this.status = status; }
    protected changeFriendStatus(status: boolean, index: number): void {
        this.friends[index].status = status;
        this.friends = [ ...this.friends ];
    }
    protected async buttonHandler(): Promise<void> {
        if (this.isEdit) {
            !this.playerName
                ? await this.deletePlayer(this.alreadySignedUp._id)
                : await this.changePlayer({
                    ...this.alreadySignedUp,
                    name: this.playerName,
                    friends: this.filteredFriends,
                    status: this.status,
                });
        } else {
            if (!this.playerName) return;
            await this.setNewPlayer({ name: this.playerName, friends: this.filteredFriends, status: this.status });
        }

        if (this.callback) this.callback();

        if (this.playerName) await this.changeUser({ ...this.currentUser, name: this.playerName });

        this.playerName = '';
        this.friends = [{ name: '' , status: true }];
    }
    protected cancelHandler(): void { this.callback(); }
    private cloneFriendsArray(newFriendsArray: FriendItem[]): void {
        for (const field of Object.keys(newFriendsArray)) {
            if (this.friends[Number(field)]) {
                this.friends[Number(field)].name = newFriendsArray[Number(field)].name;
                this.friends[Number(field)].status = newFriendsArray[Number(field)].status;
            } else {
                this.friends[Number(field)] = { ...newFriendsArray[Number(field)] };
            }
        }
    }

    @Watch('friends', { immediate: true, deep: true })
    private changeInput(val: FriendItem[]) {
        const lastItemIndex = val.length - 1;
        if (val[lastItemIndex] && val[lastItemIndex].name.trim()) {
            if (val.length < 4) val.push({ name: '', status: true });
        }
        if (val[lastItemIndex - 1] && !val[lastItemIndex - 1].name.trim()) val.pop();
    }

    private mounted() {
        if (this.isEdit) {
            this.playerName = this.alreadySignedUp.name;
            this.status = this.alreadySignedUp.status;
            if (this.alreadySignedUp.friends.length) this.cloneFriendsArray(this.alreadySignedUp.friends);
        } else {
            this.playerName = this.currentUser.name;
        }
    }
}
</script>

<style scoped lang="scss">
    .playersBlock {
        width: 100%;
        box-sizing: border-box;
        border-radius: 10px;
        padding: 5px;
        background-color: #aaa1;

        div {
            margin-top: 5px;

            &:nth-of-type(1) {
                margin: 0;
            }
        }

        .friendsWr {
            margin-top: 10px;
        }

        @media (max-width: 475px) {
            width: auto;
        }
    }

    .buttonWr {
        margin-top: 10px;
        display: flex;
        justify-content: flex-end;

        .cancelButton {
            margin-right: 10px;
        }
    }
</style>
