import { fetch } from '@/utils';

import { PeopleItem } from '@/store/types';

export const getPeopleData = () => fetch.get('/people/getPeopleData')
    .then((response) => response.data);
export const getPeopleByDate = (date: string) => fetch.post('/people/getPeoplesByDate', { date })
    .then((response) => response.data);
export const savePeople = (people: PeopleItem) => fetch.post('/people/savePeople', { people })
    .then((response) => response.data);
export const deletePeople = (id: string, date: string) => fetch.post('/people/deletePeople', { id, date })
    .then((response) => response.data);
export const saveEvent = (time: string, place: string, date: string, minimum: number) => fetch
    .post('/events/saveEvent', { time, place, date, minimum })
    .then((response) => response.data);
export const getEvents = () => fetch.get('/events/getEvent')
    .then((response) => response.data);
export const deleteEvent = (id: string) => fetch.post('/events/deleteEvent', { id })
    .then((response) => response.data);
export const saveEventMinimum = (eventId: string, minimum: number) => fetch
    .post('/events/saveEventMinimum', { eventId, minimum })
    .then((response) => response.data);
