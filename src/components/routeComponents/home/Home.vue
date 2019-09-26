<template>
  <div class="home">
    <div class="horizontalLine">
      <div class="placeWr">
        <Input placeholder="Место" type="text" label="Где играем?" v-model="place"/>
        <Button text="Изменить место" @onClick="savePlace"/>
        <Input placeholder="Время" type="time" label="Во сколько?" v-model="time"/>
        <Button text="Изменить время" @onClick="saveTime"/>
      </div>
    </div>
    <div class="columnWr">
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
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Action, Mutation, Getter } from 'vuex-class';

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
  protected place: string = '';
  protected time: string = '';

  @Action('setPeopleData', { namespace })
  private setPeopleData!: any;
  @Action('getPeopleData', { namespace })
  private getPeopleData!: any;
  @Mutation('setMinimum', { namespace })
  private setMinimum!: any;
  @Getter('getMinimum', { namespace })
  private currentMinimum!: number;
  @Mutation('setPlace', { namespace })
  private setPlace!: any;
  @Mutation('setTime', { namespace })
  private setTime!: any;

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
  protected savePlace(): void {
    this.setPlace(this.place);
    this.place = '';
  }
  protected saveTime(): void {
    this.setTime(this.time);
    this.time = '';
  }

  private mounted() {
    this.getPeopleData();

    this.minimum = this.currentMinimum || 0;
  }
}
</script>

<style scoped lang="scss">
  .columnWr {
    padding: 20px;
    display: flex;
    justify-content: space-around;
  }

  .horizontalLine {
    width: 100%;
    padding: 15px 0;
    border-bottom: 1px solid black;

    .placeWr {
      font-weight: bold;
      width: 400px;
      margin: 0 auto;
    }
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
    padding: 0 20px;
  }

  @media (max-width: 1250px) {
    .columnWr {
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

  @media (max-width: 475px) {
    .tableWr {
      font-size: 12px;
    }

    .inputWr {
      width: auto;
    }

    .horizontalLine {

      .placeWr {
        width: auto;
      }
    }
  }

  @media (max-width: 350px) {
    .tableWr {
      font-size: 8px;
    }
  }
</style>
