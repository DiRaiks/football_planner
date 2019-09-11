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
import Vue from 'vue';

export default Vue.extend({
    name: 'TableLine',
    props: {
        number: Number,
        name: String,
        friends: Array,
    },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    td {
        padding: 5px 10px;
    }
</style>
