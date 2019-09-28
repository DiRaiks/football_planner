import axios from 'axios';

import { PeopleItem } from '@/store/types';
import { FETCH_URL } from '@/store/constants';

export const getPeopleData = () => axios.get(`${FETCH_URL}/getPeopleData`)
    .then((response) => response.data);
export const getPeopleByDate = (date: string) => axios.post(`${FETCH_URL}/getPeoplesByDate`, { date })
    .then((response) => response.data);
export const savePeople = (people: PeopleItem) => axios.post(`${FETCH_URL}/savePeople`, { people })
    .then((response) => response.data);
export const deletePeople = (id: string) => axios.post(`${FETCH_URL}/deletePeople`, { id })
    .then((response) => response.data);
export const saveEvent = (time: string, place: string, date: string, minimum: number) => axios
    .post(`${FETCH_URL}/saveEvent`, { time, place, date, minimum })
    .then((response) => response.data);
export const getEvents = () => axios.get(`${FETCH_URL}/getEvent`)
    .then((response) => response.data);
export const deleteEvent = (id: string) => axios.post(`${FETCH_URL}/deleteEvent`, { id })
    .then((response) => response.data);
export const saveEventMinimum = (eventId: string, minimum: number) => axios
    .post(`${FETCH_URL}/saveEventMinimum`, { eventId, minimum })
    .then((response) => response.data);
