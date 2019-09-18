import axios from 'axios';

import { PeopleItem } from '@/store/types';
import { FETCH_URL } from '@/store/constants';

export const getPeopleData = () => axios.get(`${FETCH_URL}/getPeopleData`)
    .then((response) => response.data);
export const savePeople = (people: PeopleItem) => axios.post(`${FETCH_URL}/savePeople`, { people })
    .then((response) => response.data);
export const deletePeople = (id: string) => axios.post(`${FETCH_URL}/deletePeople`, { id })
    .then((response) => response.data);
