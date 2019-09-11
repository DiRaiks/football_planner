<template>
  <div class="home">
    <Table/>
    <Input text="test" type="text" label="testLabel"/>
    <Button text="text"/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src
import Button from '@/components/reusableComponents/button/Button.vue';
import Input from '@/components/reusableComponents/input/Input.vue';
import Table from '@/components/reusableComponents/table/Table.vue';

export default Vue.extend({
  name: 'home',
  components: {
    HelloWorld,
    Button,
    Input,
    Table,
  },
});
</script>
