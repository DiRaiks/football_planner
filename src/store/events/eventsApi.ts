import { fetch } from '@/utils';

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
