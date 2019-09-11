<template>
    <label :for="currentId">
        <span >{{label}}</span>
        <input :id="currentId" :type="type" :value="text">
    </label>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
    name: 'Input',
    props: {
        type: String,
        text: String,
        label: String,
    },
    computed: {
        currentId(): string {
            return this.label + this.type;
        },
    },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    span {
        margin-right: 20px;
    }
    input {
        outline: none;
        border-radius: 4px;
        border: 1px solid black;
        height: 20px;
        width: 200px;
        font-size: 16px;
    }
</style>
