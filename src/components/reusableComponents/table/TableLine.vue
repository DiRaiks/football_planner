<template>
    <tr class="line">
        <td>{{number}}</td>
        <td>{{name}}</td>
        <template v-for="(friend, index) in friends">
            <td :key="friend + index" >{{friend}}</td>
        </template>
    </tr>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component

export default class TableLine extends Vue {
    @Prop() private number!: number;
    @Prop() private name!: string;
    @Prop() private friends!: string[];
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    td {
        padding: 5px 10px;
    }
</style>
