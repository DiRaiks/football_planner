<template>
    <div class="tableWr">
        <table border="1">
            <thead>
                <tr>
                    <td></td>
                    <td>Имя</td>
                    <td :colspan="friendsColspan">+1</td>
                </tr>
            </thead>
            <tbody>
                <TableLine
                        v-for="(item, index) in peopleData"
                        :key="index"
                        :number="index"
                        :name="item.name"
                        :friends="item.friends"
                />
                <tr class="boldRow minimumRow">
                    <td>Минимум</td>
                    <td :colspan="friendsColspan + 1">{{minimum}}</td>
                </tr>
                <tr class="boldRow">
                    <td>Всего</td>
                    <td :colspan="friendsColspan + 1">{{allPeopleCount}}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Getter } from 'vuex-class';

import TableLine from './TableLine.vue';

const namespace: string = 'table';


interface PeopleItem {
    friends: string[];
    name: string;
}

@Component({
    components: {
        TableLine,
    },
})
export default class UserDetail extends Vue {
    @Getter('getPeopleData', { namespace })
    private peopleData!: PeopleItem[];
    @Getter('getMinimum', { namespace })
    private minimum!: number;


    get friendsColspan(): number {
        let maxColspan = 0;
        this.peopleData.forEach((item: PeopleItem) => {
            if (maxColspan < item.friends.length) {
                maxColspan = item.friends.length;
            }
        });
        return maxColspan;
    }
    get allPeopleCount(): number {
        let count = 0;
        this.peopleData.forEach((item: PeopleItem) => {
            count += item.friends.length;
        });
        return count + this.peopleData.length;
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
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
