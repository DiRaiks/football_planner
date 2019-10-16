<template>
    <div class="eventWr">
        <div class="createEventBlock">
            <div><StyleInput type="text" label="Название встречи" v-model="eventName"/></div>
            <div><StyleInput type="text" label="Адрес встречи" v-model="place"/></div>
            <div class="dateTime">
                <div class="date"><StyleInput type="date" label="Дата" v-model="date"/></div>
                <div class="time"><StyleInput type="time" label="Время" v-model="time"/></div>
            </div>
            <div><StyleInput type="number" nim="10" max="22" label="Количество игроков" v-model="minimum"/></div>
        </div>
        <div class="buttonWr">
            <Button class="addEventButton" :text="buttonText"
                    @onClick="buttonHandler"/>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Action, Getter } from 'vuex-class';

import StyleInput from '@/components/reusableComponents/styleInput/StyleInput.vue';
import Button from '@/components/reusableComponents/button/Button.vue';

import { EventItem } from '@/store/types';

@Component({
    components: {
        Button,
        StyleInput,
    },
})
export default class EventForm extends Vue {
    protected eventName: string = '';
    protected place: string = '';
    protected time: string = '';
    protected date: string = '';
    protected minimum: string | number = '';

    @Prop({ default: false }) private isEdit!: boolean;
    @Prop() private callback!: any;

    @Action('saveNewEvent', {namespace: 'events'})
    private saveNewEvent!: any;
    @Action('changeEvent', {namespace: 'events'})
    private changeEvent!: any;
    @Getter('getCurrentEvent', { namespace: 'events' })
    private currentEvent!: EventItem;

    get buttonText(): string {
        return this.isEdit ? 'Редактировать событие' : 'Добавить событие';
    }

    protected async buttonHandler(): Promise<void> {
        if (!this.time || !this.place || !this.date || !this.eventName || !this.minimum) {
            return;
        }
        if (this.isEdit) {
            await this.changeEvent({
                ...this.currentEvent,
                time: this.time,
                place: this.place,
                date: this.date,
                minimum: +this.minimum,
                eventName: this.eventName,
            });
        } else {
            await this.saveNewEvent({
                time: this.time,
                place: this.place,
                date: this.date,
                minimum: +this.minimum,
                eventName: this.eventName,
            });
        }

        if (this.callback) this.callback();

        this.place = '';
        this.time = '';
        this.date = '';
        this.eventName = '';
        this.minimum = '';
    }

    private mounted() {
        if (this.isEdit) {
            this.eventName = this.currentEvent.eventName;
            this.place = this.currentEvent.place;
            this.time = this.currentEvent.time;
            this.date = this.currentEvent.date;
            this.minimum = this.currentEvent.minimum;
        }
    }
}
</script>

<style scoped lang="scss">
    .createEventBlock {
        width: 370px;
        border-radius: 10px;
        padding: 5px;
        background-color: #eeeeee;

        div {
            margin-top: 5px;

            &:nth-of-type(1) {
                margin: 0;
            }
        }

        .dateTime {
            display: flex;

            .date {
                flex: 3;
            }

            .time {
                margin: 0 0 0 5px;
                flex: 1;
            }
        }
    }

    .buttonWr {
        margin-top: 20px;
        display: flex;
        justify-content: flex-end;
    }
</style>
