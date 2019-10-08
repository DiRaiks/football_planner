import { fetch } from '@/utils';
import { EventItem } from '../types';

export const saveEvent = (event: EventItem) => fetch
    .post('/events/saveEvent', event)
    .then((response) => response.data);
export const getEvents = () => fetch.get('/events/getEvent')
    .then((response) => response.data);
export const deleteEvent = (id: string) => fetch.post('/events/deleteEvent', { id })
    .then((response) => response.data);
export const saveEventMinimum = (eventId: string, minimum: number) => fetch
    .post('/events/saveEventMinimum', { eventId, minimum })
    .then((response) => response.data);
export const changeEvent = (eventId: string, event: EventItem) => fetch
    .post('/events/changeEvent', { eventId, event })
    .then((response) => response.data);
