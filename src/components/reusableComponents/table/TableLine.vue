<template>
    <tr class="line">
        <td class="number">{{ number }}</td>
        <td :class="statusClass">{{ statusText }}</td>
        <td class="name">{{ name }}</td>
        <td>
            <div
                v-for="(friend, index) in friends"
                class="friendIcon">
            </div>
        </td>
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
    @Prop() private status!: boolean;

    @Action('deletePeople', { namespace })
    private deletePeople!: any;

    protected deleteName(): void {
        this.deletePeople(this.id);
    }

    get statusClass(): object {
        return {
            status: true,
            [`status-${ this.status ? 'true' : 'maybe' }`]: true,
        };
    }
    get statusText(): string {
        return this.status ? 'Точно буду' : 'Может буду';
    }
}
</script>

<style scoped lang="scss">
    .line {
        .name {
            text-align: left;
        }

        .status {
            padding: 5px 10px;
            font-size: 14px;
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
            display: inline-block;
            width: 16px;
            height: 16px;
            background-image: url('../../../assets/user-solid.svg');
            background-size: 16px 16px;
            margin-right: 2px;
        }
    }
    td {
        padding: 5px 10px;
    }
</style>
