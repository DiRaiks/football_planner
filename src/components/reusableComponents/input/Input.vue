<template>
    <label :for="currentId">
        <span >{{label}}</span>
        <input
                :id="currentId"
                :type="type"
                :placeholder="placeholder"
                @input="handleInput"
                @change="handleInput"
        >
    </label>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Input extends Vue {
    @Prop() private label!: string;
    @Prop() private placeholder!: string;
    @Prop() private type!: string;
    @Prop() private input!: () => void;
    @Prop() private filter!: (value: string) => void;

    get currentId(): string {
        return this.label + this.type;
    }

    private handleInput(event: any): void {
        const { value } = event.target;
        const filteredValue = this.filter ? this.filter(value) : value;

        if (filteredValue !== value) event.currentTarget.value = value;
        this.$emit('input', filteredValue);
    }
}
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
