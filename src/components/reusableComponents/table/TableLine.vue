<template>
    <tr class="line">
        <td class="number">{{ number }}</td>
        <td :class="statusClass">{{ statusText }}</td>
        <td class="name">{{ name }}</td>
        <td>
            <Tooltip
                    v-for="(friend, index) in friends"
                    :key="index"
                    :tooltip="friend.name || friend"
            >
                <div :class="['friendIcon', ...setFriendIconClass(friend)]"/>
            </Tooltip>
        </td>
        <!--<td><button @click="deleteName">Удалить</button></td>-->
    </tr>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Action } from 'vuex-class';

import Tooltip from '@/components/reusableComponents/tooltip/Tooltip.vue';

import { FriendItem } from '@/store/types';

@Component({
    components: {
        Tooltip,
    },
})
export default class TableLine extends Vue {
    @Prop() private number!: number;
    @Prop() private name!: string;
    @Prop() private friends!: string[];
    @Prop() private id!: string;
    @Prop() private status!: boolean;

    @Action('deletePlayer', { namespace: 'players' })
    private deletePlayer!: any;

    get statusClass(): object {
        return {
            status: true,
            [`status-${ this.status ? 'true' : 'maybe' }`]: true,
        };
    }
    get statusText(): string { return this.status ? 'Точно буду' : 'Может буду'; }

    protected setFriendIconClass(friend: FriendItem): object { return { maybe: !friend.status }; }

    protected deleteName(): void {
        this.deletePlayer(this.id);
    }
}
</script>

<style scoped lang="scss">
    .line {
        .name {
            text-align: left;
        }

        .status {
            padding: 0px 10px;
            border-radius: 4px;

            &-true {
                color: #155724;
                background-color: #d4edda;
                border: 1px solid #c3e6cb;
            }
            &-maybe {
                color: #856404;
                background-color: #fff3cd;
                border: 1px solid #ffeeba;
            }
        }

        .friendIcon {
            width: 16px;
            height: 16px;
            background-size: 16px 16px;
            background-image: url('../../../assets/user-solid.svg');

            &.maybe {
                background-image: url('../../../assets/user-solid_false.svg');

            }
        }
    }
    td {
        padding: 5px 10px;
    }
</style>
