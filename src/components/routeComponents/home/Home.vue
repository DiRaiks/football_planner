<template>
  <div class="home">
    <div class="horizontalLine">
      <div class="placeWr">
        <Button v-if="currentEvent" class="deleteEventButton" text="Удалить текущее событие" @onClick="deleteCurrentEvent"/>
        <template v-else>
          <Input placeholder="Место" type="text" label="Где играем?" v-model="place"/>
          <Input placeholder="Дата" type="date" label="Когда?" v-model="date"/>
          <Input placeholder="Время" type="time" label="Во сколько?" v-model="time"/>
          <Button text="Сохранить" @onClick="saveEvent"/>
        </template>
      </div>
    </div>
    <div v-if="currentEvent" class="columnWr">
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
          <Input type="checkbox" label="Точно буду" v-model="status"/>
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

import { EventItem } from '@/store/types';

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
  protected date: string = '';
  protected status: boolean = true;

  @Action('setPeopleData', { namespace })
  private setPeopleData!: any;
  @Action('getEvents', { namespace })
  private getEvent!: any;
  @Action('setEvent', { namespace })
  private setEvent!: any;
  @Action('setEventMinimum', { namespace })
  private setEventMinimum!: any;
  @Action('deleteEvent', { namespace })
  private deleteEvent!: any;
  @Getter('getCurrentEvent', { namespace })
  private currentEvent!: EventItem;

  protected addFriend(): void {
    this.friends.push('');
  }
  protected savePeople(): void {
    if (this.peopleName) {
      const filteredFriends = this.friends.filter((friend: string) => {
        if (friend) return friend;
      });

      this.setPeopleData({ name: this.peopleName, friends: filteredFriends, status: this.status });
      this.peopleName = '';
      this.friends = [''];
    }
  }
  protected saveMinimum(): void {
    this.setEventMinimum(this.minimum);
  }
  protected saveEvent(): void {
    if (!this.time || !this.place || !this.date) return;
    this.setEvent({ time: this.time, place: this.place, date: this.date, minimum: 0 });
    this.place = '';
    this.time = '';
    this.date = '';
  }
  protected deleteCurrentEvent(): void {
    this.deleteEvent();
  }

  private async mounted() {
    if (this.currentEvent )this.minimum = this.currentEvent.minimum;
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
    padding: 15px 20px;
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
