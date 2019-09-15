<template>
  <div class="home">
    <Table/>
    <Input placeholder="Имя" type="text" label="Своё имя" v-model="peopleName"/>
    <Input placeholder="Друг" type="text" label="Имя друга" v-model="friendName"/>
    <Button text="text" @onClick="testClick"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Action } from 'vuex-class';

import Button from '@/components/reusableComponents/button/Button.vue';
import Input from '@/components/reusableComponents/input/Input.vue';
import Table from '@/components/reusableComponents/table/Table.vue';

const namespace: string = 'table';

@Component({
  components: {
    Button,
    Input,
    Table,
  },
})

export default class Home extends Vue {
  protected peopleName: string = '';
  protected friendName: string = ''; // TODO: доделать возможность добавления нескольких друзей

  @Action('setPeopleData', { namespace })
  private setPeopleData!: any;


  protected testClick(): void {
    if (this.peopleName) this.setPeopleData({name: this.peopleName, friends: []});
  }
}
</script>
