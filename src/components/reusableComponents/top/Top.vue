<template>
    <div :class="['top', currentClass]">

    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Top extends Vue {
    @Prop() private color!: string;

    get currentClass(): string {
        return 'red';
    }
}
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
