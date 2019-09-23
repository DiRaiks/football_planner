<template>
    <div class="tableWr">
        <table border="1">
            <thead>
                <tr>
                    <td></td>
                    <td>Имя</td>
                    <td :colspan="friendsColspan">+1</td>
                    <td>Редактирование</td>
                </tr>
            </thead>
            <tbody>
                <TableLine
                        v-for="(item, index) in peopleData"
                        :key="index"
                        :number="index"
                        :name="item.name"
                        :friends="item.friends"
                        :id="item._id"
                />
                <tr class="boldRow minimumRow">
                    <td>Минимум</td>
                    <td :colspan="friendsColspan + 1">{{minimum}}</td>
                </tr>
                <tr class="boldRow">
                    <td>Всего</td>
                    <td :colspan="friendsColspan + 1">{{peopleDataCount}}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Getter } from 'vuex-class';

import { PeopleItem } from '@/store/types';
import TableLine from './TableLine.vue';

const namespace: string = 'table';

@Component({
    components: {
        TableLine,
    },
})
export default class Table extends Vue {
    @Getter('getPeopleData', { namespace })
    private peopleData!: PeopleItem[];
    @Getter('getPeopleDataCount', { namespace })
    private peopleDataCount!: number;
    @Getter('getFriendsColspan', { namespace })
    private friendsColspan!: number;
    @Getter('getMinimum', { namespace })
    private minimum!: number;
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .tableWr {
        padding: 15px 20px;
    }
    td {
        padding: 5px 10px;
    }
    .boldRow {
        background: aquamarine;
        font-weight: bold;
    }
    .minimumRow {
        background: rgba(255, 0, 3, 0.48);
    }
</style>
