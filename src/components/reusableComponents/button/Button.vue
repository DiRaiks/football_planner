<template>
    <button>{{text}}</button>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
    name: 'Button',
    props: {
        text: String,
        onChange: Function,
    },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
