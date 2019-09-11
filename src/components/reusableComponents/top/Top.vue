<template>
    <div :class="['top', currentClass]">

    </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
    name: 'Top',
    props: {
        color: String,
    },
    computed: {
        currentClass() {
            return 'red';
        },
    },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .top {
        width: 100%;
        height: 100px;
    }

    .red {
        background: red;
    }

    .green {
        background: green;
    }
</style>
