<template>
    <div class="horizontalLine">
        <div class="placeWr">
            <Button
                v-if="currentEvent"
                class="deleteEventButton"
                text="Удалить текущее событие"
                @onClick="deleteCurrentEvent"
            />
            <template v-else>
                <Input placeholder="Место" type="text" label="Где играем?" v-model="place"/>
                <Input placeholder="Дата" type="date" label="Когда?" v-model="date"/>
                <Input placeholder="Время" type="time" label="Во сколько?" v-model="time"/>
                <Button text="Сохранить" @onClick="saveEvent"/>
            </template>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Action, Getter } from 'vuex-class';

import Button from '@/components/reusableComponents/button/Button.vue';
import Input from '@/components/reusableComponents/input/Input.vue';

import { EventItem } from '@/store/types';

@Component({
    components: {
        Button,
        Input,
    },
})

export default class AllEvents extends Vue {
    protected place: string = '';
    protected time: string = '';
    protected date: string = '';

    @Action('deleteEvent', {namespace: 'events'})
    private deleteEvent!: any;
    @Action('setCurrentEvent', {namespace: 'events'})
    private setCurrentEvent!: any;
    @Getter('getCurrentEvent', {namespace: 'events'})
    private currentEvent!: EventItem;
    @Getter('getEvents', {namespace: 'events'})
    private events!: EventItem[];

    protected saveEvent(): void {
        if (!this.time || !this.place || !this.date) {
            return;
        }
        this.setCurrentEvent({time: this.time, place: this.place, date: this.date, minimum: 0});
        this.place = '';
        this.time = '';
        this.date = '';
    }

    protected deleteCurrentEvent(): void {
        this.deleteEvent();
    }
}
</script>

<style scoped lang="scss">
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
</style>
