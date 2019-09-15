<template>
  <div class="home">
    <Table/>
    <Input text="test" type="text" label="testLabel"/>
    <Button text="text"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src
import Button from '@/components/reusableComponents/button/Button.vue';
import Input from '@/components/reusableComponents/input/Input.vue';
import Table from '@/components/reusableComponents/table/Table.vue';

@Component({
  components: {
    HelloWorld,
    Button,
    Input,
    Table,
  },
})

export default class Home extends Vue {}
</script>
