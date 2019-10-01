import axios from 'axios';

import { PeopleItem } from '@/store/types';
import { FETCH_URL } from '@/store/constants';

export const getPeopleData = () => axios.get(`${FETCH_URL}/api/people/getPeopleData`)
    .then((response) => response.data);
export const getPeopleByDate = (date: string) => axios.post(`${FETCH_URL}/api/people/getPeoplesByDate`, { date })
    .then((response) => response.data);
export const savePeople = (people: PeopleItem) => axios.post(`${FETCH_URL}/api/people/savePeople`, { people })
    .then((response) => response.data);
export const deletePeople = (id: string) => axios.post(`${FETCH_URL}/api/people/deletePeople`, { id })
    .then((response) => response.data);
export const saveEvent = (time: string, place: string, date: string, minimum: number) => axios
    .post(`${FETCH_URL}/api/events/saveEvent`, { time, place, date, minimum })
    .then((response) => response.data);
export const getEvents = () => axios.get(`${FETCH_URL}/api/events/getEvent`)
    .then((response) => response.data);
export const deleteEvent = (id: string) => axios.post(`${FETCH_URL}/api/events/deleteEvent`, { id })
    .then((response) => response.data);
export const saveEventMinimum = (eventId: string, minimum: number) => axios
    .post(`${FETCH_URL}/api/events/saveEventMinimum`, { eventId, minimum })
    .then((response) => response.data);
