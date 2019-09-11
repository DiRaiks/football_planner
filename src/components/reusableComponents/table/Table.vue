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
                        v-for="(item, index) in testData"
                        :key="index"
                        :number="index"
                        :name="item.name"
                        :friends="item.friends"
                />
                <tr class="boldRow minimumRow">
                    <td>Минимум</td>
                    <td :colspan="friendsColspan + 1">{{allPeopleCount}}</td>
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
import Vue from 'vue';
import { mapGetters } from 'vuex';

import TableLine from './TableLine.vue';


interface PeopleItem {
    friends: string[];
    name: string;
}

export default Vue.extend({
    name: 'Table',
    components: {
        TableLine,
    },
    computed: {
        ...mapGetters('table', { peopleData: 'getPeopleData' }),
        friendsColspan(): number {
            let maxColspan = 0;
            this.peopleData.forEach((item: PeopleItem) => {
                if (maxColspan < item.friends.length) {
                    maxColspan = item.friends.length;
                }
            });
            return maxColspan;
        },
        allPeopleCount(): number {
            let count = 0;
            this.peopleData.forEach((item: PeopleItem) => {
                count += item.friends.length;
            });
            return count + this.peopleData.length;
        },
    },
});
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
