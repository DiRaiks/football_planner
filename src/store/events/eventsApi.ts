import { fetch } from '@/utils';
import { EventItem } from '../types';

export const saveEvent = (event: EventItem) => fetch
    .post('/events/save', event)
    .then((response) => response.data);
export const getEvents = () => fetch.get('/events/all')
    .then((response) => response.data);
export const deleteEvent = (id: string) => fetch.delete('/events/delete', { params: { eventID: id } })
    .then((response) => response.data);
export const saveEventMinimum = (eventId: string, minimum: number) => fetch
    .post('/events/saveEventMinimum', { eventId, minimum })
    .then((response) => response.data);
export const changeEvent = (id: string, event: EventItem) => fetch
    .put('/events/change', event, { params: { eventID: id } })
    .then((response) => response.data);
export const getEventById = (id: string) => fetch.get('/events/get', { params: { eventID: id } })
    .then((response) => response.data);
