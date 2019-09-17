<template>
  <div class="home">
    <Table/>
    <div class="minInputWr">
      <Input
              placeholder="Минимум"
              type="number"
              :min="0" :max="20"
              label="Минимум игроков"
              v-model="minimum"
      />
      <Button class="saveMinimum" text="Изменить" @onClick="saveMinimum"/>
    </div>
    <div>
      <div class="inputWr">
        <Input placeholder="Своё имя" type="text" label="Своё имя" v-model="peopleName"/>
        <Input
                v-for="(friend, index) in friends"
                :key="index"
                placeholder="Имя друга"
                type="text"
                :label="`Имя друга ${index + 1}`"
                v-model="friends[index]"
        />
      </div>
      <Button text="Добавить друга" @onClick="addFriend"/>
    </div>
    <Button class="savePeople" text="Сохранить" viewType="positive" @onClick="savePeople"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Action, Mutation } from 'vuex-class';

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
  protected friends: string[] = [''];
  protected minimum: number = 0;

  @Action('setPeopleData', { namespace })
  private setPeopleData!: any;
  @Mutation('setMinimum', { namespace })
  private setMinimum!: any;

  protected addFriend(): void {
    this.friends.push('');
  }
  protected savePeople(): void {
    if (this.peopleName) {
      this.setPeopleData({ name: this.peopleName, friends: this.friends });
      this.peopleName = '';
      this.friends = [''];
    }
  }
  protected saveMinimum(): void {
    this.setMinimum(this.minimum);
  }
}
</script>

<style scoped lang="scss">
  .inputWr {
    display: flex;
    flex-direction: column;
    width: 400px;
    margin: 20px auto;

    label:first-child {
      font-weight: bold;
    }
  }

  .savePeople {
    margin-top: 40px;
  }

  .minInputWr {
    margin-top: 20px;
    width: 600px;
    display: flex;
    align-items: center;
  }
</style>
