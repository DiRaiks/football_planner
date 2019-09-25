<template>
    <tr class="line">
        <td>{{number}}</td>
        <td>{{name}}</td>
        <template v-for="(friend, index) in friends">
            <td :colspan="oneFriendColspan" :key="friend + index" >{{friend}}</td>
        </template>
        <td v-if="!friends.length" :colspan="friendsColspan"></td>
        <td><button @click="deleteName">Удалить</button></td>
    </tr>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Getter, Action } from 'vuex-class';

const namespace: string = 'table';

@Component
export default class TableLine extends Vue {
    @Prop() private number!: number;
    @Prop() private name!: string;
    @Prop() private friends!: string[];
    @Prop() private id!: string;

    @Getter('getFriendsColspan', { namespace })
    private friendsColspan!: number;
    @Action('deletePeople', { namespace })
    private deletePeople!: any;

    protected deleteName(): void {
        this.deletePeople(this.id);
    }

    get oneFriendColspan(): number {
        if (this.friends.length === 1) {
            return this.friendsColspan;
        }
        return 1;
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    td {
        padding: 5px 10px;
    }
</style>
