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
                <tr class="boldRow">
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
    data() {
        return {
            testData: [{
                name: 'ololoo',
                friends: ['1212121dfsdfsdfsdf', '121212', 'assa'],
            },
            {
                name: 'ololoo',
                friends: [],
            }],
        };
    },
    computed: {
        friendsColspan() {
            let maxColspan = 0;
            this.testData.forEach((item: PeopleItem) => {
                if (maxColspan < item.friends.length) {
                    maxColspan = item.friends.length;
                }
            });
            return maxColspan;
        },
        allPeopleCount(): number {
            let count = 0;
            this.testData.forEach((item: PeopleItem) => {
                count += item.friends.length;
            });
            return count + this.testData.length;
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
</style>
