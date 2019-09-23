<template>
  <div class="home">
    <div class="leftColumn">
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
      <Table/>
    </div>
    <div class="rightColumn">
      <div class="addPeopleBlock">
        <Button text="Добавить друга" @onClick="addFriend"/>
        <Button class="savePeople" text="Сохранить" viewType="positive" @onClick="savePeople"/>
      </div>
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
    </div>
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
  @Action('getPeopleData', { namespace })
  private getPeopleData!: any;
  @Mutation('setMinimum', { namespace })
  private setMinimum!: any;

  protected addFriend(): void {
    this.friends.push('');
  }
  protected savePeople(): void {
    if (this.peopleName) {
      const filteredFriends = this.friends.filter((friend: string) => {
        if (friend) return friend;
      });

      this.setPeopleData({ name: this.peopleName, friends: filteredFriends });
      this.peopleName = '';
      this.friends = [''];
    }
  }
  protected saveMinimum(): void {
    this.setMinimum(this.minimum);
  }

  private mounted() {
    this.getPeopleData();
  }
}
</script>

<style scoped lang="scss">
  .home {
    padding: 20px;
    display: flex;
    justify-content: space-around;
  }
  .inputWr {
    display: flex;
    flex-direction: column;
    width: 400px;

    label:first-child {
      font-weight: bold;
    }
  }

  .minInputWr {
    display: flex;
    align-items: center;
  }

  .addPeopleBlock {
    display: flex;
    justify-content: space-around;
    padding: 15px 20px;
  }

  @media (max-width: 1250px) {
    .home {
      flex-direction: column;
    }

    .rightColumn {
      margin-top: 40px;

      .inputWr {
        margin: 30px auto 0;
      }

      .addPeopleBlock {
        justify-content: center;

        .savePeople {
          margin-left: 40px;
        }
      }
    }

    .leftColumn {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  }
</style>
